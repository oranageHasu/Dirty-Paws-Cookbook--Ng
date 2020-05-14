# Stage 1: "build-stage", based on Node.js, to build and compile the frontend
FROM node:10.13.0 as build-stage

# Set working directory
WORKDIR /app

# Cache app dependencies
# This is a credentials file for our private NPM repository
COPY package*.json /app/

# Upgrade NPM to v5.3.0
RUN npm install -g --upgrade npm@5.3.0

# Copy over the Dirty Paws Cookbook app
COPY . /app

# Install NPM Modules for the Dirty Paws Cookbook app
RUN npm install

ARG ENVIRONMENT

# Build the app
RUN npm run $ENVIRONMENT

# Stage 2: Nginx (our service host)
# This is a Nginx docker image with Brotli/ModSecurity/OWASP ModSecurity Core Rule Set (CRS)
# See: https://hub.docker.com/r/krish512/modsecurity/
FROM krish512/modsecurity

WORKDIR /root/

# Expose ports for Angular
EXPOSE 443
EXPOSE 80

# Copy the ES5 build result of Dirty Paws Cookbook to Nginx
COPY --from=build-stage /app/dist/Dirty-Paws-Cookbook /usr/share/nginx/html

# Copy the nginx.conf provided within the Dirty Paws Cookbook project itself
COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf

# Copy the SSL Certificate provided within the Dirty Paws Cookbook project itself
COPY --from=build-stage /app/localhost.crt /etc/nginx/ssl/localhost.crt

# Copy the SSL Key provided within the Dirty Paws Cookbook project itself
COPY --from=build-stage /app/localhost.key /etc/nginx/ssl/localhost.key
