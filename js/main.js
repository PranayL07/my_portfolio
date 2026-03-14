/* ============================================================
   PORTFOLIO — main.js
   Pranay Lamture · DevOps & Platform Engineer
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── AUTO YEAR IN FOOTER ──────────────────────────────── */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();


  /* ─── NAV: SCROLL STATE ────────────────────────────────── */
  const navbar = document.getElementById('navbar');

  const handleNavScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  };

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();


  /* ─── NAV: HAMBURGER (MOBILE) ──────────────────────────── */
  const hamburger = document.getElementById('navHamburger');
  const navLinks  = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('mobile-open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target)) {
        navLinks.classList.remove('mobile-open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }


  /* ─── SCROLL REVEAL ────────────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const siblings = entry.target.parentElement
              ? [...entry.target.parentElement.querySelectorAll('.reveal:not(.visible)')]
              : [];
            const index = siblings.indexOf(entry.target);
            const delay = index >= 0 ? index * 80 : 0;

            setTimeout(() => entry.target.classList.add('visible'), delay);
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );

    revealEls.forEach(el => revealObserver.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }


  /* ─── CONTACT FORM ─────────────────────────────────────── */
  // ↓ Update this if your email address ever changes
  const CONTACT_EMAIL = 'lamturepranay7@gmail.com';

  // EmailJS configuration - Get these from https://www.emailjs.com/
  const EMAILJS_SERVICE_ID = 'service_oi3kzdl'; // Replace with your EmailJS service ID
  const EMAILJS_TEMPLATE_ID = 'template_w0r3zl9'; // Replace with your EmailJS template ID
  const EMAILJS_PUBLIC_KEY = 'RzS07eZgWrmwI3Roa'; // Replace with your EmailJS public key

  // Initialize EmailJS
  emailjs.init(EMAILJS_PUBLIC_KEY);

  const form      = document.getElementById('contactForm');
  const statusEl  = document.getElementById('formStatus');
  const submitBtn = document.getElementById('submitBtn');

  const sendIconSVG = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" stroke-width="2.5">
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>`;

  function showStatus(msg, type) {
    statusEl.textContent = msg;
    statusEl.className   = `form-status ${type}`;
  }

  function resetButton() {
    submitBtn.disabled = false;
    submitBtn.innerHTML = `${sendIconSVG} Send Message`;
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name    = document.getElementById('fname').value.trim();
      const email   = document.getElementById('femail').value.trim();
      const subject = document.getElementById('fsubject').value.trim();
      const message = document.getElementById('fmessage').value.trim();

      // Validation
      if (!name || !email || !subject || !message) {
        showStatus('Please fill in all fields.', 'error');
        return;
      }

      if (!isValidEmail(email)) {
        showStatus('Please enter a valid email address.', 'error');
        return;
      }

      statusEl.className = 'form-status';
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';

      if (typeof emailjs === 'undefined' || !emailjs.send) {
        showStatus('✗ Email service not available. Please refresh the page or contact me directly.', 'error');
        resetButton();
        return;
      }

      // Template parameters (match your EmailJS template fields)
      // Note: EmailJS (and many email services) will send from a verified sender address,
      // but you can set the reply-to and include the sender name/address in the template.
      const templateParams = {
        from_name: name,
        from_email: email,
        reply_to: email,           // Set Reply-To so replies go to the visitor
        subject: subject,          // Use {{subject}} in your EmailJS template to show this
        email_subject: subject,    // Optional alternative variable name
        message: message,
        to_email: CONTACT_EMAIL
      };

      emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
        .then((response) => {
          console.log('EmailJS success', response);
          showStatus('✓ Message sent successfully! Thanks for reaching out.', 'success');
          form.reset();
          resetButton();
        })
        .catch((error) => {
          console.error('EmailJS error', error);

          // If emailjs returns a status/text, include it in the UI for easier troubleshooting
          const details = (error && (error.text || error.message))
            ? ` (${error.text || error.message})`
            : '';

          showStatus(`✗ Failed to send message${details}. Please check the browser console and your EmailJS settings.`, 'error');
          resetButton();
        });
    });
  }

});
