FROM mariadb:latest

# Copy the initialization SQL file into the container
COPY init.sql /data/application/init.sql

# Set permissions on the initialization SQL file
RUN chown mysql:mysql /data/application/init.sql
RUN chmod 644 /data/application/init.sql

EXPOSE 3306
