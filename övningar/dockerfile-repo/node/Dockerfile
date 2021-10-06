FROM node
WORKDIR /THISISMYWORKDIR
ENV port=5000
EXPOSE 5000
COPY ./package*.json .
RUN npm install
COPY . .
CMD ["node", "index.js"]