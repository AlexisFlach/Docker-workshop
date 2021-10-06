FROM golang:1.7.1 

COPY src /go/src

RUN CGO_ENABLED=0 GOOS=linux go build -o src src/main.go
