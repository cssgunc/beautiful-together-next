# 1. Use the official Node.js image (with Alpine for a smaller footprint)
FROM node:18-alpine

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy the rest of the application code to the working directory
COPY . .

# 6. Expose port 3000 for the Next.js app
EXPOSE 3000

# 7. Set permissions (optional, in case of permission issues)
RUN chmod -R 755 /app

# 8. Start the Next.js development server
CMD ["npm", "run", "dev"]
