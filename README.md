# **E-Comerce REST API**  ![NestJS](https://img.shields.io/badge/NestJS-%23E0234E.svg?style=flat&logo=nestjs&logoColor=white) ![TypeScript](https://img.shields.io/badge/Typescript-%23007ACC.svg?style=flat&logo=typescript&logoColor=white) ![JavaScript](https://img.shields.io/badge/Javascript-%23323330.svg?style=flat&logo=javascript&logoColor=%23F7DF1E) ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=flat&logo=mongodb&logoColor=white) ![Docker](https://img.shields.io/badge/Docker-%230db7ed.svg?style=flat&logo=docker&logoColor=white) ![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=flat&logo=eslint&logoColor=white)

This repository contains a REST API of Sales Store Application with storage to a MongoDB database.
Each application service is separated into modules that correspond to their respective domain and also each endpoint is documented using the Open API standard through Swagger.

---

## **Table of Contents** 📖  
1. [Pre-Requirements](#pre-requirements-)
2. [Installation](#installation-)
3. [Running the app](#running-the-app-)
4. [HTTP Endpoints](#http-endpoints-desktop_computer)
5. [Module Architecture](#module-architecture-)
---

## **Pre-Requirements** 📋  
- Install Docker  
Here is the official link to download it: https://www.docker.com/get-started/  
- Why Docker?  
Docker will allow you to connect to the MongoDB database.

---

## **Installation** 🔧
- Once Docker is installed and running.
```bash
$ docker-compose up -d
```
This will create a container with the mongodb database.

- Install the necessary dependencies for this project.
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

---

## **Module Architecture** 📐

![Module Diagram](https://user-images.githubusercontent.com/106860308/217153488-bbcd949a-a304-40cf-9a10-798917f60a27.jpg)
