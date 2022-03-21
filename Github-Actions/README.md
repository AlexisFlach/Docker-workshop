## Github Actions

##### Vad är Github Actions

Github Actions är en plattform skapat för att automatisera software development workflow.

"Automate, customize, and execute your software development workflows right inyour repository with GitHub Actions. 
You can discover, create, and share actions toperform any job you'd like, including CI/CD, and combine actions in a completelycustomized workflow."

Notera "including CI/CD". Det är alltså inte specifikt skapat för CI/CD utan CI/CD ärendast ett av många workflows(flöden) man kan automatisera.

Varje gång något händer i ens Github Repo så ska något ske.
Github Actions skapades således för att automatisera det som sker vid events kopplat till Github(push, pull, fork etc...).

```
1. När något sker IN eller UT från ditt repo = EVENTSpull, push, merge, issue created,etc...
2. Vad som ska ske som svar till dessa events = ACTIONS
```

#### CI/CD med Github Actions

Det vanligaste workflowet för ens repo är CI/CD.

##### Workflow template

Vi kan även använda oss av redan färdiga workflow templates. Dessa är uppdelade i 3 kategorier:

1. Deployment workflows
2. Continuous Integration Workflows
3. Automate every step of your process

#### Workflow File

Vi skapar våra egna workflows med hjälp av en yaml-fil som vi lägger i .github/workflows

**name** 

```
name: [optional] visas på ditt repos action page, beskriver vad ensworkflow ska handla om
```

```
name: myWorkflow
```

**on**

```
on: namn på det github event som triggar igång workflowet
```

```
on: push
```

**jobs**

Grupperar task som ska ske baserat på on

```
jobs:
  test_project:
    runs-on: ubuntu-latest
```

Här är alltså jobs obligatoriskt att ha med för att gruppera vad som ske efter etteller flera events. 
test-project är vad jobs ska ha för namn.Vad menas då med "gruppera vad som ska ske". 
Vad är "vad"?
Vad är en sekvens av steg, steps, som ska ske efter event triggern. Som parantes så är runs-on vilken virtuell maskin allt ska ske i.

**steps**

```
name: my-repo-action-name
on: push
jobs:test-project:
  runs-on: ubuntu:latest
  steps:
  - uses: actions/checkout@v2
  
  - name: Run Unittest
    run: python -m unittest discover -s ./Tests
```

**uses**

När vi vill använda oss av en redan skriven action

https://github.com/actions

```
- uses: actions/checkout@v2
```

I detta specifika fall använder vi oss av action checkout@v2.
https://github.com/actions/checkout
Det är alltså **step 1**: checka koden.

**step 2**

```
 - name: Run Unittest 
 run: python -m unittest discover -s ./Tests
 ```

Här namnger vi ett steg och testar den baserar på de unit tests vi har satt upp.

**step 3**

```
 - name: Build and Push Docker Image
uses: mr-smithers-excellent/docker-build-push@v5   
with:image: flachens/test-test-app    
registry: docker.io    
username: ${{ secrets.DOCKER_USERNAME }}    
password: ${{ secrets.DOCKER_PASSWORD }}
```

Här använder vi ett 3rd party action som är skapat för att bygga images och pusha till Docker.

```
name: testing
on: push

jobs:  test_project:    
  runs-on: ubuntu-latest    
  steps:      
    - uses: actions/checkout@v2      
    - name: Run Unittest        
      run: python -m unittest discover -s ./Tests      
      - name: Build and Push Docker Image        
      uses: mr-smithers-excellent/docker-build-push@v5        
      with:          
        image: flachens/test-test-app          
        registry: docker.io          
        username: ${{ secrets.DOCKER_USERNAME }}          
        password: ${{ secrets.DOCKER_PASSWORD }}
```

Varje gång vi pushar till vårt repo kan vi nu se dessa steg i actions!
Våra secrets sätter vi i vårt repo

Settings/Secrets -> New repository secret





































