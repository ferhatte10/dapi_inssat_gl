# Inssat Intranet GL

Brief description of your project.

## Table of Contents

- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Docker Compose](#docker-compose)
- [Contributing](#contributing)
- [License](#license)

## Project Structure

├── README.md

├── apiBlog/

├── auth/

├── dapi-luncher/

├── gateway/

└── stressTest/

- `apiBlog/`: Description of the contents of this directory.
- `auth/`: Description of the contents of this directory.
- `dapi-luncher/`: Description of the contents of this directory.
- `gateway/`: Description of the contents of this directory.
- `stressTest/`: Description of the contents of this directory.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/en/download/)
- [Locust](https://docs.locust.io/en/stable/installation.html)

## Getting Started

Provide instructions on how to get started with your project. Include any setup steps, configuration, or environment variables that need to be set.

## Usage

Explain how to use your project. Include examples if necessary.

## Docker Compose

### Services

- **api-blog**: Description of the service.
- **gateway**: Description of the service.
- **mariadb**: Description of the service.

### How to Run
#### Docker Compose
1. Clone this repository.
2. Navigate to the project lunch directory:
    ```bash 
    cd dapi-luncher
    ```
3. Run the following command to start the services:

   ```bash
   sh compose.sh
   ```
4. Run the following command to stop the services:

   ```bash
   sh downcontainers.sh
   ```
#### NPM & Docker for database and auth service
1. Clone this repository.
2. Navigate to each service directory (nodejs: gateway, apiBlog, database: mariadb & auth : auth) and run the following command:

    2.1. Nodejs services:
    ```bash 
    npm install # install dependencies
    npm run dev # run the service in development mode
    ```
    2.2. Database service:
    ```bash
    sh rundb.sh # run the database service
    ```
    2.3. Auth service:
    ```bash
    sh build.sh # build the service
    sh run.sh # run the service
    ```

# Imprortant !
- The database service must be running before running the nodejs services if you dont deploy the docker-compose version.
- The auth service is not implemented yet, so you can ignore it.
- The stressTest service is just for testing the apiBlog service, so you can ignore it or use it if you want to test the apiBlog service with a lot of requests. To use it, you must run the apiBlog service first then run the following command:

    ```bash
    locust --host=http://localhost:5000 --master # run the master node of locust
    ```
    Then open your browser and go to http://localhost:8089 to start the test.
    
