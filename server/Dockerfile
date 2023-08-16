# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Install build tools
RUN apt-get update && apt-get install -y python3 make g++ && apt-get clean

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install the application's dependencies inside the container
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Specify the command to run when the container starts
CMD ["npm", "start"]

# Copy the entrypoint script into the container
COPY entrypoint.sh /usr/src/app/entrypoint.sh

# Set the entrypoint script to run when the container starts
ENTRYPOINT ["/usr/src/app/entrypoint.sh"]