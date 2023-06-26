# Laravel and React Innoscipta Case Study

This is a Dockerized application that combines a Laravel backend and a React frontend.

## Prerequisites

- Docker: https://www.docker.com/get-started

## Getting Started

Clone the repository:

   ```
   git clone https://github.com/BerzEpic/innoscripta-saad.git
   ```
Navigate to the project directory:

```
cd innoscripta-saad
```
Build and run the Docker containers:
```
docker-compose up -d
```
This command will build the Docker images for Laravel and React, create the necessary containers, and start the application.

## Access the Laravel backend:

Open your web browser and visit: `http://localhost:8000`
Access the React frontend:

Open your web browser and visit: `http://localhost:8081`
## Directory Structure
The project directory structure is as follows:

back-end/    				  # Laravel backend project directory
client/      				  # React frontend project directory
docker-compose.yml            # Docker Compose configuration file
README.md                     # Project documentation

back-end: This directory contains the Laravel backend project. 

client: This directory contains the React frontend project.

docker-compose: This file defines the Docker services and configuration for running the Laravel and React containers.

## Additional Information
The Laravel backend runs on port 8000 and can be accessed at http://localhost:8000.

The React frontend runs on port 8081 and can be accessed at http://localhost:8081.

The Docker containers are orchestrated using Docker Compose.

## License
This project is licensed under the MIT License.
