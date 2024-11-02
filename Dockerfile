# Use the official lightweight Node.js 16 image.
# https://hub.docker.com/_/node
FROM node:21-slim

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install on every code change.
COPY package*.json ./

EXPOSE 80
ENV NODE_ENV=production

# Install production dependencies.
RUN npm install --omit=dev

# Copy local code to the container image.
COPY . ./

# Run the web service on container startup.
CMD [ "npm", "run", "build"]