# NestJS-MongoDB

<p align="center">
<img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" />
</p>
<p>![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=flat&logo=typescript&logoColor=white)</p> 

# **E-Comerce REST API**

This repository contains a REST API of Sales Store Application with storage to a MongoDB database.
Each application service is separated into modules that correspond to their respective domain and also each endpoint is documented using the Open API standard through Swagger.

---

## **Pre-Requirements** 📋  
- Install Docker  
Here is the official link to download it: https://www.docker.com/get-started/  
- Why Docker?  
Docker will allow you to launch the API service and connect it to the database.

---

## **Installation** 🔧

- Install the necessary dependencies for this project
```bash
$ npm install
```

- The repository contains a file called .env.example which shows an example of the environment variables needed to run the application. In the root directory ("/") create an .env file and add the environment variables detailed in the .env.example file.

---

## **Running the app** 🚀

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# up mongo database
$ docker-compose up -d mongo
```

---

## **HTTP Endpoints** :desktop_computer:

Once the application is running, access the following URI where you will find the documentation for each endpoint and Dto (Data Transfer Object).

```
/docs
```
URL example
```
http://localhost:3000/docs
```
