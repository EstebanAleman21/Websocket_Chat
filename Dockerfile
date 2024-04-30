# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Argument to pass GitHub repository URL at build time
ARG GITHUB_REPO_URL

# Clone your repository
RUN git clone ${GITHUB_REPO_URL} .

# Install any needed packages
RUN npm install

# Make port 3003 available to the world outside this container
EXPOSE 3004

# Define environment variable
ENV NAME WebSocketChat

# Run server.js when the container launches
CMD ["node", "server.js"]
