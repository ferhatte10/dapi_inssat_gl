FROM node:lts

# Set the working directory within the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install project dependencies
RUN npm install

COPY . .

# Download the wait-for-it script
ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /usr/local/bin/wait-for-it
RUN chmod +x /usr/local/bin/wait-for-it

# Expose port 3000
EXPOSE 3001

# waiting for dependencies to be available and then starts the application
CMD ["sh", "-c", "wait-for-it -t 2 db:3306 && sleep 2s && npm start"]
