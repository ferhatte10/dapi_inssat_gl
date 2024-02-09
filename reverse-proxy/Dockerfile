FROM nginx:latest


# Install Certbot
RUN apt update && apt install -y certbot python3-certbot-nginx

RUN mkdir -p /etc/nginx/sites-enabled 

# chown www-data:www-data /var/www/html/react
RUN mkdir -p /var/www/html/react
RUN chown -R www-data:www-data /var/www/html/react


# Create symbolic links for NGINX sites
RUN ln -s /etc/nginx/sites-available/api.dapi-services.fr /etc/nginx/sites-enabled/api.dapi-services.fr && \
    ln -s /etc/nginx/sites-available/auth.dapi-services.fr /etc/nginx/sites-enabled/auth.dapi-services.fr && \
    ln -s /etc/nginx/sites-available/intranet.dapi-services.fr /etc/nginx/sites-enabled/intranet.dapi-services.fr


EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]