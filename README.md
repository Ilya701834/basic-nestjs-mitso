# basic-nestjs-mitso

### **Express**

![image](https://user-images.githubusercontent.com/75899249/146977991-2ed60d0d-4532-4a01-a9f7-455bcac3e0da.png)

### **Fastify**

![image](https://user-images.githubusercontent.com/75899249/146979764-61e39feb-e831-4dee-8c6f-1a995b9f673e.png)

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package
  manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

## Development

If you're using VSCode, you can get a better developer experience from integration with
[ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and
[Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions.

### Auto-fix and format

```
npm run lint
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging


## Or Running via docker

Run in terminal:

```
docker-compose up
```

If you want to stop, press the keyboard shortcut first **Ctrl+C**, then enter in the terminal:

```
docker-compose down
```

Rebuild images & start containers:

```
docker compose up —build
```

Сonnected services:

- PostgreSQL
- pgAdmin
- Express

## **Migrations**

Running migrations:

```
$ npm run migration:run
```

Revert migration:

```
$ npm run migration:revert
```
