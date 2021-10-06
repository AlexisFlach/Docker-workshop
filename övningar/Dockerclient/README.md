## Docker Client

Syftet här är att genom att ge instruktioner till Docker Client (Docker CLI) hämta färdiga Images från Docker Hub och se vad vi kan göra med dessa!

**Länk till Docker hub där vi hämtar images:**

https://hub.docker.com/

#### Kommandon för att komma igång

Börja med att köra

```
docker version
```

För att lista samtliga Images vi har lokalt:

```
docker images
```

För att lista all Containers som körs:

```
docker ps
```

eller

```
docker container ls
```

För att lista alla containers:

```
docker ps --all
```

#### Hämta en Image från Docker Hub

**1.**

```
docker run hello-world
```

**2.**

```
docker ps
```

**3.**

```
docker ps --all
```

**4.**

```
docker start -a <container id>
```

**5.**

```
docker run hello-world
```

**6.**

```
docker rmi -f $(docker images -a -q)
```

PowerShell:

```
docker images -a -q | % { docker image rm $_ -f }
```

Windows command line

```
for /F %i in ('docker images -a -q') do docker rmi -f %i
```



Docker Image "hello-world" innehåller ett simpelt program som printar ut det vi såg i terminalen. När den är klar med kommandot får den status: exited. Den är med andra ord väldigt kortlivad.  Vi kan dock i enlighet med en containers livscykel start upp den igen, och tillslut även döda den.

#### Manipulera Containers med Docker Client

https://hub.docker.com/_/ubuntu

**1.**

```
docker pull alpine
```

**2.**

```
docker run alpine
```

**3.**

```
docker run -it alpine sh
```

**4.**

```
ls
```

**5.** 

Öppna en ny tab

```
docker ps
```

Kopiera container ID

```
docker inspect <CONTAINER ID>
```

**6.**

Gå tillbaks till tabben där du är inne i containern

```
apk add --no-cache mysql-client
```

```
mysql
```

**7.**

Öppna en ny tab

```
docker ps
```

```
docker exec -it <container id> sh
```

Vi vet nu att 

- vi kan *overrida* ett images default startup command. 

- vi kan *gå in* i en container som körs genom **exec**
- vi använder oss av -it-flag för att öppna en terminal i vår container. Väldigt bra i felsökningssyfte.

#### nginx

Skapa en mapp som heter app

Skapa index.html

```
<h1>Hello World</h1>
```

Gå till terminale och kör 

```
docker run nginx --name webserver -p 8080:80 -v $(pwd):/usr/share/nginx/html
```

Här introduceras två viktiga koncept:

- -p :  Port mapping. Docker lyssnar på vilken port som körs i containern och gör den tillgänglig utifrån. Denna gång på port 8080.
- -v: Volumes. En container har ingen *persisten* data. När containern dör, sparas ingen data. Genom att använda oss av **volumes** kan vi spara ner vår data lokalt. Detta görs ofta när man arbetar med databaser, eller som här i **development**.

#### Övningar

**1**

###### Redis

https://hub.docker.com/_/redis

Kör

```
docker run redis
```

Ditt mål är att innefrån container kunna köra

1.

```
redis-cli
```

2.

```
set myval 10
```

3.

```
get myval
```

4.

```
"10"
```

**2**.

###### Httpd

https://hub.docker.com/_/httpd

Ditt mål är att rendera ut "Hello World" i webbläsaren

Info du behöver

```
Image name: https
Intern port: 80
Path till output files: /usr/local/apache2/htdocs/
```







