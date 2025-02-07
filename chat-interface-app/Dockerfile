# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install only production dependencies
RUN npm install

# Copy the rest of your application's source code into the container
COPY . .

# Expose port 3000 to the host
EXPOSE 3000

# Define the command to run your application
CMD [ "npm", "start" ]
