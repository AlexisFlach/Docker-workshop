## Docker Compose

Docker Compose är ett verktyg skapat av Docker i syfte att bygga och köra multi-container applications. 
Docker Compose är dels docker-compose.yml där vi kan definera vår applikationer och våra conteiners, men även Docker Compose CLI, som fungerar ungefär på samma sätt som Docker CLI.

```
docker-compose
```

 Docker compose introducerar konceptet av multi-container applications genom docker-compose.yml. Var noga med indentering när ni skriver en docker-compose.yml-fil. Filen innehåller all information om våra  Docker-baserade applikations komponenter så som services, networks och volumes.

 ```
 docker-compose --version
 ```

 En docker-compose fil består av fyra styck top-level keys:
 - version
 - services
 - networks
 - volumes

**version** är obligatorisk information och ska alltid vara på den första raden. Den definerar senaste versionen av Compose File Format (ungefär som API).

**services** är var vi definerar applikationens komponenter. Compose deployar dessa som sina egna containers.

**network** säger åt Docker att skapa nya nätverk.

**volumes** är var vi berättar för Docker att skapa nya Volumes.

#### Applikation: node-php

**docker-compose.yml**

```
version: '3'

services: 
  api:
    build: ./api
    volumes:
      - /app/node_modules
      - ./api:/app
    ports:
      - 4001:4001
  client:
    image: php:apache
    volumes: 
      - ./client:/var/www/html
    ports:
      - 5001:80
    depends_on:
      - api
```

```
docker-compose up
```

#### Applikation: flask-redis

```
docker-compose
docker-compose top
docker-compose stop
docker-compose rm
docker-compose ps
docker-compose start
docker-compose restart
docker-compose kill
docker-compose log
docker-compose exec
docker-compose run
```

