# Use an official Node.js image as the base
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the app's source code to the working directory
COPY . .

# Build the app
RUN npm run build

# Expose port 8081
EXPOSE 8081

# Set the command to run when the container starts
CMD ["npm", "start"]
