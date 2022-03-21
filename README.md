# Docker Workshop

#### Hur hamnade vi här?

Förr i tiden kunde vi endast köra en applikation per server, så varje gång vi ville starta upp en ny applikation krävdes en ny server. Eftersom att en applikation som ligger nere är en väldigt dålig applikation, så betydde det att man ofta köpte in stora servrar och fick som konsekvens ett väldigt dåligt utnyttjande av resurser då applikationerna allt som oftast inte alls behövde all dessa resurser.

In kom Virtual Machines och nu kunde man börja köra flera applikationer på sammma server. Detta förenklade arbetet för it-avdelningarna som inte längre
behövde lägga stor tid och möda på att köpa in nya servrar och det blev mer kostnadseffektivt för företag. Så vad gör vi här? Om vi nu sitter här och diskuterar
en, för ändamålet, ny och förbättrad teknologi så måste det betydda att Virtual Machines(från och med nu VM) åtminstone hade vissa förbättringsmöjligheter.
Visst är det så. VMs kräver en hel del som vi egentligen inte behöver. Varje VM kräver sitt egna dedikerade OS. Varje OS konsumerar CPU(Central
processing unit), RAM(Random Access Memory) etc. som hade kunnat användas till annat... fler applikationer!

Containerteknologin fanns även innan Docker. Detta fantastiska verktyg vi kan använda oss av är resultatet av många utvecklare som tillsammans har bidragit till
vi idag kan köra och hantera applikationer i en isolerad miljö, där den isolerade miljön kallas för Containers och bygger på att dem delar på samma OS.

Vad Docker gjorde var att förenkla användandet av containers.

#### Containerteknologi VS Virtuella maskiner

Tänk att vi har ett företag som vill köra fyra styck applikationer och funderar på att
antingen köra dom som VMs eller Container.

### Virtual Machine Approach

1. Den fysiska servern sätts igång och Hypervisorn bootar igång.
2. Väl igång gör den anspråk på samtliga fysiska resurser på systemet, så som
CPU, RAM, storage etc.
3. Av dessa resurser skapar den Virtuela versioner. Den virtuella version känns,
luktar, ser ut, beter sig precis som the real deal, men med mindre resurser.
4. Dessa paketeras till en software construct kallas Virtual Machines.
5. Vi får dessa VMs och OS och applikationer på SAMTLIGA. Det är precis som att
du hade installerat om din dator och du får en ny clean version av ditt OS. Inga
filer i Documents eller Downloads, endast Internet Explorer installerat osv

Företaget blir då lämnat med fyra styck Virtual Machines.
Som bas har vi den fysiska servern. På den installeras ett software: hypervisor.
Hypervisorns syfte här i livet är att skapa och köra VMs. Förr i tiden kunde vi endast
köra ett OS per server. Tack vare hypervisorn har vi nu möjlighet att köra flera
isolerade OS på samma server. Låt oss därför undersöka hypervisorn lite närmare.

#### Virtualisering, hypervisor och kernel

Med virtualisering menas att separera operativsystemet från den underliggande hårdvaran.
Förr i tiden när vi installerade ett operativsystem blev det oskiljaktigt från den underliggande hårdvaran som den installerades på.
Vad virtualisering gör är att det ger ett lager på hårdvaran, hypervisor, och på detta lager installerar vi OS. Det är är så vi installerar OS på våra datorer idag.

Varför är detta betydelsefullt?

1. Vi har nu möjlighet att flytta över dessa OS till andra servrar.
2. Vi kan nu installera flera instanser av OS på samma fysiska server hardware.

Att dela upp det underliggande hårdvaran är hypervisorns jobb. Den underliggande hårdvaran kallas för Host Machine. 
De VMs som skapas kallas för Guest Machine. Hypervisorns arbetsbeskrivning slutar dock inte vid att skapa dessa isolerade
miljöer. Arbetet inkluderar även hantering. Skulle en VMs behöve mer resurser så löser den (förhoppningsvis) det. Den kan även starta och stoppa VMs om
användaren begär detta. Även att isolera VMs från varandra ingår i det dagliga arbetet. Om problem uppstår i en VM ska inte det påverka en annan VM. Däremot
hanterar HV kommunikationer VMs emellan.

Det finns två typer av hypervisors:

##### Type 1 Hypervisors

Denna typ kör direkt på host machine. Alternativet skulle vara att köra på ett underliggande OS. Detta betyder att HV har direktaccess till hårdvaran utan att
behöva prata med en överordnad för göra sin grej. Denna typ är ansedd som den best-performing och mest effektiva HVn för enterprise computing(ex. adminapplikation för företag).

Exempel på Type 1 HV är VMWares ESXi och Microsofts Hyper-V.

##### Type 2 Hypervisors

Dessa byggs ovanpå OS. Så först har vi den fysiska hårdvaran, ett OS installeras och sen kommer HV. HV har ej längre direktaccess till hårdvaran. Dessa HVs kallas för hosted hypervisors.
Här körs HVn som en applikation på OS.

Exampel på type-2 hypervisors inkluderar Oracle Solaris Zones, Oracle VM Server
for x86, Oracle VM Virtual Box, VMware Workstation, VMware Fusion.

### Container Approach

Vi har nu gått igenom hur det skulle gå till att köra fyra stycken applikationer som Virtual Machine. 
Nu vill företaget veta mer om container approachen.

1. Servern sätts igång och OS bootar upp.
2. OS gör anspråk på samtliga fysiska resurser.
3. Ovanpå OS installeras en Container Engine.
4. Denna Container Engine tar då OS-resurser så som the Process tree,
filsystemet, the network stack, och delar sedan upp dem i isolated constructs:
containers.
5. Varje container känns, luktar, beter sig, som ett riktigt OS.
6. Inuti varje container kör vi en applikation.

Den stora skillnaden approacherna emellan är OS. Där varje VM hade ett eget OS, delar nu våra container på samma OS.
Hypervisorn(från tidigare VM approach) kör en hardware virtualization: fysisk hårdvara till virtuella versioner; VMs
Containers kör en Operating System virtualization: Tar OS-resurser och skapar
virtuella versioner; containers.

Vi installerade alltså antingen ett OS eller en hypervisor. Så långt likadant. Nästan.
Den stora skillnaden är att för varje OS vi installerar konsumeras resurser. I containermodellen har vi endast ett OS/kernel som körs på Host Machine. 
Detta gör att de startar upp mycket snabbare än VMs. När en container körs har Kernel redan kommit till jobbet, druckit kaffe, grejat med resurser på Host OS. Det ända container behöver göra är att starta upp sin applikation.
En containers syfte i livet är att köra applikationer. Varken mer eller mindre

#### Kernel

En kernel är hjärtat och kärnan i ett operativsystem. Kernel har total kontroll över system och är det första program som laddas när ett system startas.

Kernel ansvarar för low-level uppgifter som disk management, memory management, task management etc. Den ger ett gränssnitt mellan användare och hårdvara. När en process, exempelvis Chrome skickar en request till Kernel kallas det för system call.

I stort kan man säga att Kernels arbetsuppgifter består av att vara en medlare mellan användare och systemresurser. I det ligger att fördela resurserna så att
samtliga processer får tillräckligt med resurser för att kunna göra sina grejer. Till exempel så behöver varje resurs minne för execution. Det är Kernels jobb

### Docker

En snabb genomgång av de viktigaste koncepten.

Docker gör det väldigt enkelt för oss att installera och köra software utan att behöva oroa oss för setup eller dependencies. Docker är en plattform som med olika verktyg och objekt, men arbetet handlar om att skapa och köra containers

Docker (ekosystemet / plattformen) är skapat av företag Docker inc. baserat i San Fransisco. Docker inc. började som en PaaS Provide á la Heroku eller AWS Beanstalk, men fokus ligger nu på att hjälpa till i arbetet av gå från source code till produkt
online.

Ekosystem består av bland annat
- Docker Client
- Docker Server
- Docker Machine
- Docker Images
- Docker Hub
- Docker Compose

##### Docker Server (daemon)

Lyssnar efter Docker API requests och hanterar Docker-objekt så som images, containers, networks och volumes. En daemon kan även kommunicera med andra
daemons i syfte att hantera Dockertjänster.

##### Docker Client

Det primära tillvägagångsättet för många användare för att inteagera med Docker.
När vi använder kommandon som docker run sänder klienten dessa kommandon till Docker Server(daemon), vilken hanterar dem

Om vi kör

```
docker version
```
så kan vi försäkra oss client och daemon körs, och pratar med varandra. Docker använder sig av client-server architecture. Client talar med daemon via en lokal
IPC/unix socket.

```
docker run hello-world
```

```
Hello from Docker!
This message shows that your installation appears to be working
correctly.
To generate this message, Docker took the following steps:
1. The Docker client contacted the Docker daemon
2. The Docker daemon pulled the "hello-world" image from the Docker
Hub.
 (amd64)
3. The Docker daemon created a new container from that image which runs
the
 executable that produces the output you are currently reading.
4. The Docker daemon streamed that output to the Docker client, which
sent it
 to your terminal.
To try something more ambitious, you can run an Ubuntu container with:
$ docker run -it ubuntu bash
```

I vår terminal körde vi kommandot docker run hello-world. För att vara tydliga skulle vi även ha kunna kört docker container run hello-world. När vi trycker på
enter startar det upp Docker Client/Docker CLI. Docker Clients jobb är att ta vår request, processa den till en hanterlig payload och kommunicera vidare till Docker
daemon.

Docker run hello-world säger att vi vill starta upp en ny container från en image som heter hello-world. Den kollar först om vi har en lokal kopia på vår dator.
Docker använder sig väldigt mycket av caching. Inte bara när det gäller att hämta images, utan även när vi skapar egna images vilket vi kommer in på senare. Om den
inte hittar en image som heter hello-world i vår lokala Image Cache, går den vidare till Docker Hub och pull den imagen till vår lokala image caching innan den startar
en ny instans av den imagen; kör en container.

##### Docker Images

En image är en read-only mall med instruktioner för att skapa en container.

En image innehåller allt som behövs för att köra en applikation. Eftersom att en containers syfte är att köra EN applikation, så är ofta images väldigt små. 
Endast det som krävs för att köra applikationen ska finnas med. Ser man på nedan exempel
med ubuntu image så kan vi tydligt se att det är en väldigt nedstrippad version vi får genom att kolla på storleken.

Man kan skapa egna images eller använda images skapade av andra och publicerade på ett registry. För att bygga en egen image använder man sig av en Dockerfile men
simpel syntax för att definiera stegen som krävs för att skapa en image och köra den. Varje instruktion i en Dockerfil skapar ett lager i en image. När man ändrar en instruktion i en Dockerfil och åter bygger imagen så blir endast de lager som har påverkats ombyggda (caching).

```
docker image ls
```

En nyss installerad Docker Host kommer att visa 0 images. För att få images till sin
Docker host kör man pull-kommando.

```
REPOSITORY TAG IMAGE ID CREATED SIZE
ubuntu latest 1318b700e415 about 1 min ago 72.8MB
```

Här har vi nu en nedstrippad version av Ubuntu. Varje image får ett unikt id, men man kan även namnge dem.

##### Docker Container

En container är en runtime instance av en image. På samma sätt som att man kan starta en VM från en VM template så kan man starta en eller flera containers från en
image. En container är ofta baserad på en image som endast innehåller vad som krävs för att köra applikationen.

Containerteknologin bygger på att containers delar på samma OS och körs i isolering. Exempelvis när Chrome är igång är det en process som körs på OS som
behöver få tillgång till resurser. Samma sak gäller för Containers.

Kernel använder sig av två tekniker som heter namespacing och Control Groups. Dessa är specifika för Linux OS. Namespacing betyder att isolera resurser per
process. Control Groups att limitera mängd resurser använt per process.

Det är även så Docker körs på våra datorer. När vi laddade ned Docker så installerade en Linux Virtual Machine. Varje gång vi har igång Docker så har vi i
princip Linux virtualiserat på vår dator.

Inuti denna Linux Virtual Machine är var våra containers kommer att skapas. I den finns en Kernel som hanterar processer som körs inuti dessa. Det är denna Kernel
som ansvarar för att tillge resurser från vår dator.

Man ska inte tänka att en container är fysisk construct på ens hårddisk. En container är en process som har fått resurser tilldelat sig.

##### Docker Registries

En Docker registry lagrar Docker images. Docker hub är ett exempel på en pubik registry som alla kan använda. Docker är konfigurerat att leta efter images på
Docker hub per default.

#### Hur körs Docker på ens dator?

Nyss pratade vi om isolering och begränsingar av resurser med hjälp av namespacing och control groups. Dessa är inte inkludera per default i alla os. De är
specifika för Linux, och finns ej i Windows eller Mac os. Så hur kör vi då Docker just nu?

När vi installerade Docker installerade vi en Linux Virtual Machine. Inuti den är var samtliga våra behållare kommer att skapas, i den finns en Linux Kernel och det är den som är host för processer som körs i behållare. Det är således denna kernel som bestämmer resurser på vår dator för våra containers. Vi kan se den genom att köra


###### Microservices

Vi kommer här att komma in på **microservices**, vilket är ett koncept som ligger till grund för många moderna applikationer idag. Men låt oss börja med **förr om åren**.

Förr om åren använde man sig av en **monolith architecture**. Vad som definierar en **monolith** är att samtliga komponenter i en applikationen körs på ett enskillt program. En stor klump helt enkelt.

Dessa applikationer är svåra att göra ändringar på, väldigt svåra att felsöka i och att använda sig av en CI/CD-kedja vore väldigt, väldigt segt, då varje liten förändring krävde att hela applikation *recompiled*.

Vidare började vi utveckla applikationer efter ett **three-tier architecture** baserat på presentation, applikation och data. Nu kunde olika typer av utvecklare fokusera på sina egna delar. Varje del kan köras på olika host, men delarna kommunicerade endast inne i samma applikation.

Nu till vår slutdestination: **microservices**.

Det är yterliggare ett steg i att *decouple* vår applikations komponenter till mindre delar. Man kan definera en enskild microservice som en bit **business functionality** som kan utvecklas och deployas för sig självt. En applikation blir således uppbyggs av många microservices.

En modern applikation brukar inneha följande egenskaper:

- Komponenter baserade på microservices
- En komponents *state* kommer att hanteras externt
- Den ska kunna köras överallt
- Redo för komponent-uppdateringar
- Varje komponent körs enskilt, men kan användas av andra komponenter

En container lämpas sig väldigt bra för en microservice, och det är poängen jag ville komma till här.



Kubernetes:
https://github.com/AlexisFlach/Kubernetes-study

Källor:

https://blog.resellerclub.com/what-is-a-hypervisor-and-how-does-it-work/

https://www.youtube.com/watch?v=zLJbP6vBk2M&t=528s&ab_channel=ElitheComputerGuy

https://www.redhat.com/en/topics/virtualization/what-is-virtualization

https://learning.oreilly.com/library/view/docker-deep-dive/9781800565135/

https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/