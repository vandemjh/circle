# Build stage
FROM node AS builder
RUN mkdir -p /build
WORKDIR /build
COPY package.json /build
RUN npm install
COPY . /build
RUN npm run build --prod

# Serve stage
FROM nginx AS serve
COPY nginx.conf /usr/local/nginx/conf/
COPY --from=builder /build/dist/circle/ /usr/share/nginx/html/
# EXPOSE 80