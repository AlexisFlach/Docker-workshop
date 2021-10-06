####  Docker Compose

https://docs.docker.com/compose/compose-file/compose-file-v3/

Docker Compose är ett verktyg skapat av Docker i syfte att bygga och köra **multi-container applications**. Docker Compose är dels docker-compose.yml där vi kan definera vår applikationer och våra conteiners, men även Docker Compose CLI, som fungerar ungefär på samma sätt som Docker CLI.

```
docker-compose
```

 Docker compose introducerar konceptet av multi-container applications genom **docker-compose.yml**. Var noga med indentering när ni skriver en docker-compose.yml-fil. Filen innehåller all information om våra  Docker-baserade applikations komponenter så som services, networks och volumes.

```bash
docker-compose --version
```

En docker-compose fil består av fyra styck top-level keys:

- version
- services
- networks
- volumes

**Version** är obligatorisk information och ska alltid vara på den första raden. Den definerar senaste versionen av Compose File Format (ungefär som API). Använd senaste versionen.

**Services** är var vi definerar applikationens komponenter. Compose deployar dessa som sina egna containers. Services 

**Network** säger åt Docker att skapa nya nätverk.

**Volumes** är var vi berättar för Docker att skapa nya Volumes.

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

Vi har alltså två containers, en för vår api och för vad som ska visas på hemsidan(frontend). 

Lås oss först fundera lite på alla steg vi hade varit tvungna att ta för att få denna simpla applikation att fungera om vi inte hade kunnat använda oss av docker compose.

1. Dockerfile för api.

I bägga fall skulle vi behöva skapa en Dockerfile.

Men efter det hade vi även behövt lägga till

```
docker build -t myrepo/myapp:mytag .
```

```
docker run -p 4001:4001 -v /api/node_modules - $(pwd):/api myrepo/myapp:mytag
```

Därefter samma sak med Client.

Den stora skillnaden kommer när vi kör

```
docker network cli

a583d249fe95   node-php_default         bridge    local
```

Docker Compose har automatiskt skapat ett nätverk för vår app.

#### Exempel flask app

```
./flask-app
```

Hur går vi tillväga för att *Docker Composa* denna applikation?

Vi ser ut att ha två services; flask appen och redis. Redis kommer fungera som en enklare databas.

Så vi vill alltså köra två conteiners samtidigt och dessa ska veta om varandra.

Men som vi ser så har vi endast en Dockerfile, vilken är till för att skapa flask app - imagen.

**docker-compose.yml**

```
version: "3"

services: 
  flaskapp:
    build: .
    environment: 
      - FLASK_ENV=developement
    ports:
      - 5000:5000
  
  redis:
    image: redis:4.0.11-alpine
```



```
docker-compose up
```

Så enkelt var det. 

Låt oss bryta ned det:

```
version: "3" => Docker Compose version
```

```
services: => här definieras vilka services/containers vår applikation består av
```

```
flaskapp: => all information om vår flaskapp
	build: . => i vilken kontext man hittar Dockerfile
	environment: => environment variables som används i containern.
	ports: => port forwarding från lokalt nätverk in i container
redis:
	image: => som att köra docker run redis:4.0.11-alpine
```

Vårt mål var att de skulle veta om varandra och kunna jobba ihop, men hur har det gått till?

```
docker network ls
docker inspect <network id>
```

```
[
    {
        "Name": "flask-app_default",
        "Id": "37c471ae371319a5376ffe5ee995c23e8d4",
        "Created": "2021-08-28T15:23:05.4527736Z",
        "Scope": "local",
        "Driver": "bridge",
      
        "Internal": false,
        "Attachable": true,
        "Ingress": false,
        "ConfigFrom": {
            "Network": ""
        },
        "ConfigOnly": false,
        "Containers": {
            "710a3b2ffc2b23370557ecab54d81a81a5e81219361e6b2ef4ae2c8a7723786f": {
                "Name": "flask-app_redis_1",
							...
            },
            "855ca6e2941172734ac54082a383ffdb639b086fa78dbc699de428db60438dc5": {
                "Name": "flask-app_flaskapp_1",
						....
            }
        }
    }
]
```

Två containers i network; flask_app_redis_1 och flask_app_flaskapp_1. The magic of Docker Compose.

Docker Compose har skapat ett default network för applikationen.

```
redis = Redis(host="redis", db=0, socket_timeout=5, charset="utf-8", decode_responses=True)
```

I ett network kan containers kommunicera genom att använda namn.

host="redis" är samma "redis" som i docker-compose:

```
...
  redis:
    image: redis:4.0.11-alpine
```

#### Lägg till build context och args

```
version: "3"

services: 
  flaskapp:
    build: 
      context: .
      dockerfile: Dockerfile.v2
      args:
      - PYTHON_VERSION=3.7.0-alpine3.8
    environment: 
      - FLASK_ENV=development
    ports:
      - 5000:5000
  
  redis:
    image: redis:4.0.11-alpine
```

#### Lägg till custom network

```
version: "3"

services: 
  flaskapp:
    build: 
      context: .
      dockerfile: Dockerfile.v2
      args:
      - PYTHON_VERSION=3.7.0-alpine3.8
    environment: 
      - FLASK_ENV=developement
    ports:
      - 5000:5000
    networks: 
      - mynet
  
  redis:
    image: redis:4.0.11-alpine
  networks: 
      - mynet

networks:
  mynet:
```

#### Lägg till volumes



###### docker-compose commands

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
...
```



#### 2.

**./wordpress**

För att starta igång ett wordpress-projekt med Docker-compose är detta allt du behöver göra:

**docker-compose.yml**

```
version: "3"

services:
  wordpress:
    image: wordpress:latest
    depends_on: 
      - db
    ports:
      - "8080:80"
  db:
    image: mariadb
    environment: 
      MYSQL_ROOT_PASSWORD=secret
```

2.

```
docker-compose up
```

3. Gå in på localhost:8080

Kör sedan detta för att se att du har två containers igång:

```
docker-compose ps
```

För att stoppa:

```
docker-compose down
```

#### Utan Docker Compose

```
docker network create wp_app --driver bridge

docker inspect wp_app
```



```
docker pull mysql
docker pull wordpress

docker run -dit --name mysql-1 -e MYSQL_ROOT_PASSWORD=secret --network wp_app mysql

docker run -dit --name wp-1 -p 8080:80 --network wp_app wordpress
```

#### 3 

**./traveling_wilburys**

Här har vi ett docker-compose-fil som ska representera bandet The traveling Wilburys.

```
docker-compose up
```

Kolla dockers nätverk

```
docker network ls
```



```
alexs-MacBook-Pro% docker network ls
NETWORK ID     NAME                                DRIVER    SCOPE
a1afd75d0382   bridge                              bridge    local
9ee34b9850fe   host                                host      local
219a790fea5d   none                                null      local
5899d42f9ee0   wilbury_default                     bridge    local
```



#### 

