# Use official node image as the base image
FROM node:latest as build

# Set the working directory as app
WORKDIR /usr/local/app

# Add the source code to app
COPY ./ /usr/local/app/

# Install the dependencies
RUN npm install

# Generate the build of the application
RUN npm run build

# Use official nginx image as the base image
FROM nginx:latest

# Copy the build output for nginx contents
COPY --from=build /usr/local/app/dist/angular-app /usr/share/nginx/html

# Expose port 80
EXPOSE 80
