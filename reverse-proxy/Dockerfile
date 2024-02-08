FROM nginx:alpine


# Install Certbot
RUN apt-get update && \
    apt-get install -y certbot && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*


EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]