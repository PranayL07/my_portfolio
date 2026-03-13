# Pranay Lamture — Portfolio

> Personal portfolio website for a DevOps & Platform Engineer — itself a **DevOps project**: containerised with Docker, deployed via a GitHub Actions CI/CD pipeline, served through Nginx.

---

## Tech Stack

| Layer        | Technology                    |
|--------------|-------------------------------|
| Frontend     | HTML5 · CSS3 · Vanilla JS     |
| Web server   | Nginx (Alpine)                |
| Container    | Docker                        |
| CI/CD        | GitHub Actions                |
| Registry     | Docker Hub                    |
| Deploy       | SSH + Docker on cloud VM      |

---

## Project Structure

```
portfolio/
├── index.html                       ← All sections (Hero → Contact)
├── css/
│   └── style.css                    ← Design tokens, layout, animations
├── js/
│   └── main.js                      ← Nav, scroll reveal, contact form
├── assets/
│   ├── Pranay_Lamture_CV.pdf        ← Resume (linked from hero button)
│   └── photo.jpg                    ← Profile photo (optional)
├── Dockerfile                       ← Multi-stage Nginx container
├── nginx.conf                       ← Nginx server config
├── .github/
│   └── workflows/
│       └── deploy.yml               ← CI/CD pipeline
└── README.md
```

---

## Running Locally

### Option A — Plain browser
Just open `index.html` in any browser. No build step required.

### Option B — Docker
```bash
# Build the image
docker build -t pranay-portfolio .

# Run the container
docker run -d -p 8080:80 --name portfolio pranay-portfolio

# Visit
open http://localhost:8080
```

---

## CI/CD Pipeline

Every push to `main` triggers the GitHub Actions workflow:

```
push to main
    │
    ▼
┌─────────────────────┐
│  1. Checkout code   │
│  2. Docker Buildx   │
│  3. Push to Hub     │  ← Build job
└─────────────────────┘
          │
          ▼
┌─────────────────────┐
│  4. SSH into server │
│  5. docker pull     │
│  6. Restart container│ ← Deploy job
│  7. Prune images    │
└─────────────────────┘
```

### Required GitHub Secrets

Go to **Settings → Secrets → Actions** and add:

| Secret             | Value                                  |
|--------------------|----------------------------------------|
| `DOCKER_USERNAME`  | Your Docker Hub username               |
| `DOCKER_PASSWORD`  | Docker Hub access token (not password) |
| `SSH_HOST`         | IP or hostname of your server          |
| `SSH_USER`         | SSH login user (e.g. `ubuntu`)         |
| `SSH_PRIVATE_KEY`  | Contents of `~/.ssh/id_rsa`            |

---

## Deploying to GitHub Pages (simpler alternative)

If you just want a free hosted URL without a server:

1. Push this repo to `github.com/PranayL07/PranayL07.github.io`
2. Go to **Settings → Pages → Source: main / (root)**
3. Live at `https://PranayL07.github.io`

> Note: GitHub Pages serves static files — Docker + Nginx are not used in this path.

---

## Customisation

- **Photo** → replace `<div class="about-photo-placeholder">` in `index.html` with `<img src="assets/photo.jpg" alt="Pranay Lamture" />`
- **Resume** → drop your PDF into `assets/` as `Pranay_Lamture_CV.pdf`
- **Projects** → update project cards in the `#projects` section
- **Email** → already set to `lamturepranay7@gmail.com` in `js/main.js`

---

## Connect

- LinkedIn: [linkedin.com/in/pranay-lamture](https://www.linkedin.com/in/pranay-lamture)
- GitHub: [github.com/PranayL07](https://github.com/PranayL07)
- Email: lamturepranay7@gmail.com
