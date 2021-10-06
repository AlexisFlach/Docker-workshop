### Dockerfile

En Dockerfile innehåller instruktioner för hur vi bygger våra egna Docker images. 

En typisk Dockerfile kan se ut såhär:

**./simple-python**

```dockerfile
FROM python
WORKDIR /app
COPY app.py .
CMD python app.py

```

Vi skickar Dockerfile:n till Docker Client genom att köra ett docker build-kommando.

```
docker build .
```

**.** är i vilken *context* vi vill bygga vår image, i detta fall är context lokal och baserad på var vi befinner oss i vårt filsystem

```
pwd
```

Docker Client skicka information till Docker Server, och med informationen från *build context* kan onödiga filer att ha med i image komma med. Vi kan då skapa en **.dockerignore** fil som specificerar vilka filer som ska ignoreras under build processen.

Det är bästa praxis att namnge sina images efter 1. Docker Hub användarnamn 2. App namn

```
docker build -t flachens/simple-python
```

Vi kan då pusha vår image till vårt Docker repo

```
docker push flachens/simple-python
```

#### Dockerfile instruktioner

https://docs.docker.com/engine/reference/builder/

De mest vanliga instruktionerna är:

```
FROM
WORKDIR
COPY
CMD
RUN
ENV
LABEL
EXPOSE
```

**Exempel ./simple-ubuntu**

###### FROM

Varje image behöver en **base image** som startpunk. Varje Dockerfile börjar med en FROM instruktion.

```
FROM ubuntu
```

Docker Image python är en image skapad av andra. Denna image är speciellt anpassad för att köra python applikationer.

###### WORKDIR

Sätter *working directory* för (eventuellt) kommande RUN, CMD, ENTRYPOINT, COPY och ADD instruktioner.

```
FROM ubuntu
WORKDIR /usr/app
```

###### COPY

```
COPY <source> <destination>
```

Med COPY så kopierer vi över filer lokalt till containern.

```dockerfile
FROM ubuntu
WORKDIR /usr/app
RUN apt-get update 
RUN apt-get install -y python
COPY . . 
CMD python app.py
```

###### RUN

RUN kör ett kommando i et nytt lager i imagen, och skapar ett nytt lager som kan användas i nästa build-steg.

```
RUN apt-get update 
RUN apt-get install -y python
```

Det är därför bästa praxis att hålla nere på antal RUN instruktioner.

```
RUN apt-get update && apt-get install -y \ 
  python
```

Detta reducerar antalet lager och skapar mer effektiva images.

###### CMD och ENTRYPOINT

Det kommando som kommer att köra när vi kör vår container.

###### ENV

Sätter en environement variabel på vår image. Detta används ofta för exempelvis databas-servrar som kräver inloggning

**./simple-mysql**

Om vi vill köra en mysql-container utan att använda oss av en Dockerfile behöver ta följande steg:

###### 1. 

```
docker run --name ms -p 3306:3306 -d -e MYSQL_ROOT_PASSWORD=password mysql
```

-e är en **environment variable** som vi måste ge mysql för att kunna logga in.

###### 2. 

```
docker exec -it ms bash
```

###### 3. 

```
mysql -u root -ppassword
```

Resten av stegen är för skoj skull.

###### 4.  skapa en databas

```
CREATE DATABASE mydb;
```

###### 5. anslut till database

```
USE mydb;
```

###### 6. skapa en table

```
CREATE TABLE users(id int NOT NULL AUTO_INCREMENT, name varchar(50), PRIMARY KEY(id));
```

###### 7. skapa en user

```
INSERT INTO users(name) VALUES("Alex");
```

###### 8. 

```
SELECT * FROM users;
```
Samma sak med Dockerfile.

```
FROM mysql:latest
ENV MYSQL_ROOT_PASSWORD=password
CMD ["mysqld"]
```

```
docker build -t mysql-img .
```

```
docker run -p 3306:3306 -d msy mysqld
```









