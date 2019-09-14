# Media Server

Media server for searching and streaming magnet URIs.

### Getting Started (Development)

Setup ENV.

```shell script
cp .env.example .env
```

Start [Docker](https://docs.docker.com/install/) container.

```shell script
docker-compose up --build
```

##### Adding Packages

```shell script
docker-compose exec node npm add package
```

### Getting Started (Production)

Setup ENV.

```shell script
cp .env.example .env
```

Set `APP_ENV` to `production` in .env file.

Start [Docker](https://docs.docker.com/install/) container.

```shell script
docker-compose up -d --build
```

Setup NGINX on the server to `proxy_pass` port 80 through to the app's port.

```nginx
server {
    listen 80;
    server_name example.com;
    location / {
        proxy_pass http://localhost:8080;
    }
}
```

Setup ownership of the public directories to NGINX's www-data user and group.

```shell script
chown www-data:www-data -R build
```
