# Dockerfile for serving the portfolio site as a static website
# Build and run:
#   docker build -t my-portfolio .
#   docker run -p 8080:80 my-portfolio

FROM nginx:alpine

# Copy site contents into the Nginx web root
COPY . /usr/share/nginx/html

# Expose default HTTP port
EXPOSE 80

# Keep Nginx running in the foreground
CMD ["nginx", "-g", "daemon off;"]
