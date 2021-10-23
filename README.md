# Sales API
A RESTful API implemented using Express, Postgres and Redis. It creates an API to make product orders.
## Description

The API is designed to manage customers, users, prodcuts and orders - using a JWT token to manage user sessions, a postgres database to persist data and a redis database to cache data. 
## Getting started

### Dependencies

* To run locally you will need [node](https://nodejs.org/) installed globally on your machine. You can use either `npm` or [yarn](https://yarnpkg.com/) as package managers.
* To run the project image you will need [Docker](https://www.docker.com/) installed.

### Installing and executing
To run this project make sure to clone down this repository and set up your enviroment variables - in `.env` and `ormconfig.env` - according to the examples given.
#### Running local with node
1. Run `npm install` or `yarn` inside the main folder install the project dependencies in `node modules`
2. Build the application with `npm run build` or `yarn build`
3. Run the application with `npm run serve` or `yarn serve`

You may also run in development mode with `npm run dev` or `yarn dev` after installing the dependencies.

#### Running local with Docker
On the main folder, run `docker-compose up`, this will build and run a docker image of the project using the dockerfile configurations.
