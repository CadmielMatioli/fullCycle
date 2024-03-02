FROM golang:1.22-alpine3.19 as build
ENV GO111MODULE=off
ENV CGO_ENABLED=0
ENV GOOS=linux
WORKDIR /app
COPY main.go .
RUN apk add --no-cache git \
  && go build -ldflags '-s -w -i'  -o /app/main .

FROM scratch
COPY --from=build /app/main /app/main
ENTRYPOINT ["./app/main"]