# Docker Run

## Clone this Repos

then

Step 01:

`docker build -t kt-client-app ./client`

Step 02:

`docker build -t kt-server-app ./server`

Step 03:

`docker-compose up`

The Client-App should be up at and http://localhost:3000 the Server at http://localhost:8080

## Using Docker Image

Step 01: Docker Pull 

`docker pull kienthiet/kt-server-app`

`docker pull kienthiet/kt-client-app`

Step 02: Docker Run 

`docker run -i -d -p 3000:3000 kienthiet/kt-client-app`

new terminal and run command:

`docker run -d -p 8080:8080 kienthiet/kt-server-app`

Wait about 5 minutes ... and The Client-App should be up at and http://localhost:3000 the Server at http://localhost:8080
