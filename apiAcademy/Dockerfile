FROM node:lts-alpine

# Set the working directory within the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install project dependencies
RUN npm install

COPY . .

# Install Python and pip
RUN apk add --no-cache python3 py3-pip

# Create and activate a virtual environment
RUN python3 -m venv /venv
ENV PATH="/venv/bin:$PATH"

# Install wait-for-it inside the virtual environment
RUN pip install wait-for-it

# Expose port 3000
EXPOSE 3001

# waiting for dependencies to be available and then starts the application
CMD ["sh", "-c", "/venv/bin/wait-for-it -t 2 --service db:3306 --service dapiauth:8080 && sleep 2s && npm start"]
