FROM node:alpine
ENV PORT=8081
WORKDIR '/app'
COPY package.json .
RUN npm install
COPY . .
CMD ["npm","run", "start"]