FROM node:alpine
WORKDIR "/app"
LABEL maintainer="john.doe@email.com"
COPY ./package.json ./
RUN npm install
COPY ./ ./
CMD ["npm", "run", "dev"]