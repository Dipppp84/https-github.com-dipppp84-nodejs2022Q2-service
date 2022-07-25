# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application
1. Build project
```
npm run build
```
2. Need to сreate .env from .env.example
   
3. Run the project
```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/swagger/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

## Containerization, Docker

### Running application and postgres as docker
1. Install [Docker](https://docs.docker.com/engine/install/)

2. You need to add this project to Sharing configuration in your Docker
```
Docker->Setting->Resources->File sharing->add<this project>
```
3. To run 
```
docker-compose up
```
4. To stop
```
docker-compose down
```

### Running only application as docker
To run for cmd
```
docker run -p 4000:4000 -v %cd%/src:/node/app/src --rm dipppp84/rest_service:v2
```
To run for bash
```
docker run -p 4000:4000 -v "$(pwd)/src:/node/app/src" --rm dipppp84/rest_service:v2
```

### Running only postgres as docker
To run
```
docker run -p 5432:5432 -e POSTGRES_USER=user -e POSTGRES_PASSWORD=password -e POSTGRES_DB=rest -e PGDATA=/var/lib/postgresql/data/pgdata -v pgdata:/var/lib/postgresql/data --rm dipppp84/rest_db:v1
```
