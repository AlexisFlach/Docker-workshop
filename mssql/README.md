## Microsoft SQL Server

1.

Vi börjar med att hämta en image och köra den som en container.

En image är en mall. En container är en instans av mallen.

Tänk:

```
class Image {

}
```
```
var container = new Image();
```

```
docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=Password!" -p 1433:1433 -d mcr.microsoft.com/mssql/server:2019-CU15-ubuntu-20.04
```

docker run är en kombination av två kommandon: docker pull, och docker start.

Vi hämtar hem image mcr.microsoft.com/mssql/server:2019-CU15-ubuntu-20.04 från Docker Hub lokalt, därefter startar vi den.

-e är en environment variable och sätter vårt lösenord till "Password".

med -p får vi tillgång till containerns interna port:1433, och vi får tillgång till den lokalt på port:1433.

Kör vi

```
docker ps
```

Här hittar vi vår container.

För att *gå in i containern* (få tillgång till dess terminal och filsystem) kör vi:

```
docker exec -it <container id> sh
```

```
docker exec -it 4e042977243c /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P Password!
```

```
SELECT Name from sys.Databases;
go
CREATE DATABASE mydb;
go
USE mydb;
go
CREATE TABLE myusers(id int, name varchar(50));
go
INSERT INTO table(id, name) values(1, 'jimbo');
go
SELECT * from myusers;
go
QUIT
exit
```


Azure data studio

https://docs.microsoft.com/en-us/sql/azure-data-studio/download-azure-data-studio?view=sql-server-ver15

new connection

server: localhost
authentication type: SQL Login
user name: sa
password: Password!