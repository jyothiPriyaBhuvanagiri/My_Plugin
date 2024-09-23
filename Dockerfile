# Use an official Node.js runtime as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of your plugin's source code to the container
COPY . .

# Expose the port on which your backend will run
EXPOSE 9001

# Start the Node.js server (backend/server.js is the entry point for your plugin)
CMD ["node", "backend/server.js"]
