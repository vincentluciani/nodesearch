# Use an official Node.js image
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --omit=dev

# Copy the application files
COPY . .

# Copy SSL certificate files
COPY key.pem crt.pem ./

# Set environment variable
ENV NODE_ENV=development

# Expose the port your app runs on (e.g., 3000)
EXPOSE 8001

# Start the application
CMD ["node", "app.js"]
