## Dockerfile

Docker handlar om att ta applikationer och köra dem i containers. 
Att ta enapplikation och konfigurera den till att köras som en container kallas för *containerizing*.

Processen är relativt simpel:
1. Starta med en applikation och dess dependencies.
2. Skapa en Dockerfile som beskriver ens app, dess dependencies och hur den skaköras.
3. Mata in Dockerfilen genom ett docker image build-kommando.
4. Pusha imagen till ett registry om du vill.
5. Kör en container från imagen.

#### Att skapa en egen image och köra den som en container

##### Dockerfile

En Dockerfile är startpunkten för att skapa en image. Den beskriver en applikation.
Med *beskriver en applikation* menas här vilka program den innehåller och vad den startar upp som en container.

Exempel på Dockerfile.

**Node.js**
```
FROM node:alpine
WORKDIR "/app"
LABEL maintainer="john.doe@email.com"
COPY ./package.json ./
RUN npm installCOPY ./ ./
CMD ["npm", "run", "dev"]
```

När nu steg 1 och 2 är klara, är det dags för steg 3: "Mata in Dockerfilen genom ett docker image build-kommando".
Med detta menas att vi kör filen genom Docker Client (Docker CLI).

```
docker build .
```

Den mapp där Dockerfile ligger kallas för build context. Att man har Dockerfile i root.Det är det punkten står för. Vi skriver alltså kommandot från den plats i terminalen Dockerfile finns.

```
user/alex/projects/node-app# docker build .
```

##### Bästa praxis och pusha till Docker Hub

Det är ansett vara bästa praxis att namne sina images efter a) ens användarnamnpå Docker Hub b) vad applikationen heter.

```
docker build -t flachens/node-app .
```

Vi kan senare använda detta image namn till att skicka den till Docker Hub.

```
docker push flachens/node-app
```

##### fort. Att skapa en egen image

Docker Client ger filen till Docker Server och det är Docker Server som gör det tyngsta arbetet.
Docker Server går igenom vår Dockerfile. Kollar på samtliga instruktioner ochbygger en Image av dem. 
Denna image kan användas till att starta upp en ny container.

#### Att skriva en Dockerfile - steg för steg

Som ni ser i exemplerna med Dockerfile så ser bägge exempel väldigt lika ut.
Att skapa en Dockerfile brukar gå i samma 3 steg:

1. Specificera en base image
2. Köra några kommandon för att installera yterliggare program
3. Specificera ett kommando att köra när containern startas upp.

Värt att poängtera är att förutom att skicka instruktioner så är Dockerfile bra fördokumentation och ska ses som source code, med andra ord ska den skickas med till ex. GitHub.

Men låt oss nu fokusera på att skriva en Dockerfile i syfte att skapa en egen image innan vi går in på detaljer.

Här kommer ett annat exempel på Dockerfile, denna gång ska vi skapa en redis-server(redis.io om ni vill veta mer).

Vi kommer att bryta ned det steg-för-steg

##### 1. Skapa en Dockerfile

```
# Använd en redan existerande Docker Image som bas (från Docker Hub)
FROM alpine
# Ladda ned och installera dependencies
RUN apk add --update redis
# Vad images ska göra när den startar som en container
CMD ["redis-server"]
```

##### 2. Skapa en Image

```
docker build -t flachens/redis-server .
```

##### 3. Kör den som en container

```
docker run flachens/redis-server
```

Allt som är skrivet i versaler är instruktioner till Docker Server. Det som kommerefter är instruktions argument.

```
instruktion argument
FROM  alpine
```

##### Base image

Varför behöver vi en base image? Vi behöver en startpunkt för vår image.
Det är utifrån denna base image vi sedan kan köra steg 2 och 3:

2. Köra några kommandon för att installera yterliggare program
3. Specificera ett kommando att köra när containern startas upp.
  
Så varför valde vi just alpine som base image?Det handlar helt om preferenser och vad som funkar för imagen. Hur man lär sig att välja rätt handlar om erfarenhet. Testa olika, skapa många egna Dockerfiles, såkommer det att gå enklare att välja ut! Alpine råkade ha en package manager, apk, som funkade bra med redis.

#### Projekt: skapa en applikation

I mappen *app* har vi en simpel node-applikation.

Applikationen består i stort av en index.js-fil och lite dependencies, bland annat express som är helt nödvändigt att ha med för att applikationen ens ska fungera.

**Dockerfile**

```
FROM node:alpineWORKDIR "/app"
LABEL maintainer="john.doe@email.com"
COPY ./package.json ./
RUN npm install
COPY ./ ./
CMD ["npm", "run", "dev"]
```

1. Vi väljer en base image, en nedstrippad version av node.
2. Vi skapar ett working directory inne i vad som kommer att bli en container.
3. Vi sätter ett LABEL. När folk använder imagen så vill vi att dem ska veta vemsom är maintainer.
4. Vi koperiar över package.json till nyss satta working director. Docker vet attdet är working directory vi menar när vi skriver "./"
package.json specificerar vilka dependencies vi vill ha med.Vi måste ta detta steg för annars kommer vi inte kunna köra npm install dåden ej kommer att hitta en package.json fil. npm install letar direkt efter en package.json fil i samma directory.
5. Vi installerar alla dependencies
6. Vi kopierar över allt från lokalt(kod) till working directory.
7. När containern körs körs "npm run dev", det är ungefär samma sak som attköra "python3 index.py".

##### Dockerfile Instruktioner

```
FROM vilken base image vi ska utgå ifrån
MAINTAINER metadata
RUN kör instruktioner. skapar ett nytt lager på base image
LABEL metadata
ADD kopierar nya filer eller mappar till containerns filsystem
COPY kopierar nya filer eller mappar till containerns filsystem
WORKDIR skapar ett working directory inuti containern
ENV environment variables, vanligt när vi ex. behöver sätta lösen och användare för databaser
CMD får endast användas en gång, vad som körs när containern startar
```







































































