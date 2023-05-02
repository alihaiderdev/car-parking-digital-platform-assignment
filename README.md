## Getting Started with Digital Platform Car Parking Backend And Frontend

# Backend

## Getting started

- Clone the repository

```
git clone <remote-url-of-repository> <project-name>
```

- Install dependencies for backend

```
cd <project-name>
npm install or yarn add
```

- Install dependencies for frontend

```
cd <project-name>/client
npm install or yarn add
```

- Build and run the backend server

```
npm start
```

- Build and run the backend server and start also client frontend app

```
npm run dev
```

- Run client frontend app from the root of the project

```
npm run client
```

Navigate to `http://localhost:8000` to check server is started or not!

## Project Structure

The folder structure of this app is explained below:

| Name                                                 | Description                                                                                         |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| **client**                                           | Contains all the frontend of the Car Parking App.                                                   |
| **node_modules**                                     | Contains all npm dependencies.                                                                      |
| **src**                                              | Contains source code that will be compiled to the dist dir.                                         |
| **config**                                           | Application configuration including environment-specific configs.                                   |
| **src/controllers**                                  | Controllers define functions to serve various express routes.                                       |
| **src/db**                                           | Make connection with with database.                                                                 |
| **src/middlewares**                                  | Express middlewares which process the incoming requests before handling them down to the routes     |
| **src/models**                                       | Models define schemas that will be used in storing and retrieving data from Application database    |
| **src/routes**                                       | Contain all express routes, separated by module/area of application                                 |
| **src/schemas**                                      | All schemas or validations for request that we are use in our app.                                  |
| **src/services**                                     | All services that we are use in our app.                                                            |
| **src/utils**                                        | Common functions to be used across your app.                                                        |
| **src/app.ts**                                       | Entry point to express app.                                                                         |
| **src/routes.ts**                                    | Base routes for all our app routes.                                                                 |
| .gitignore                                           | Contains all file and folder names that we dont want to push on github like, .env or secret keys.   |
| car-parking-digital-platform.postman_collection.json | This file contains all postman collections for test backend apis.                                   |
| nodemon.json                                         | Contains nodemon related configuration for real time server restart whenever change occure in code. |
| package.json                                         | Contains npm dependencies as well as [build scripts](#what-if-a-library-isnt-on-definitelytyped)    |
| tsconfig.json                                        | Config settings for compiling source code only written in TypeScript                                |
| yarn.lock                                            | Contains all dependencies or dev dependencies with complete details.                                |

## Learn More

You can learn more about [Node.js](https://nodejs.org/en).

To learn Express, check out the [Express documentation](https://expressjs.com/). |

# Frontend

## Getting started

The frontend of this project is bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Project Structure

The folder structure of this app is explained below:

| Name                      | Description                                                                                       |
| ------------------------- | ------------------------------------------------------------------------------------------------- |
| **client/node_module**    | Contains all npm dependencies.                                                                    |
| **client/public**         | Contains all public files, images and assets that are available publically.                       |
| **client/src**            | Contains source code that will be compiled to the build dir.                                      |
| **client/src/components** | Contains all reusable components like Header, Layout etc.                                         |
| **client/src/constants**  | Contains all app related constants like Base URL of backend server etc.                           |
| **client/src/context**    | Contains code related to context api for globle state management etc.                             |
| **client/src/hooks**      | Contains code related to reuseable function called Hooks started with use keyword prefix.         |
| **client/src/models**     | Contains all screens like Parkings, Register, Login etc.                                          |
| **client/src/store**      | Contains all global store realted configuration, RTK Query api slice etc.                         |
| **src/utils**             | Common functions to be used across your app.                                                      |
| **src/app.tsx**           | Contains all routes and router related setup.                                                     |
| **src/index.css**         | Main styling file of complete react app.                                                          |
| **src/index.tsx**         | Entry file of any react app contains all providers like store provider, tailwind css provider.    |
| .gitignore                | Contains all file and folder names that we dont want to push on github like, .env or secret keys. |
| tailwind.config.js        | Contains all configuration realted to tailwind css                                                |
| package.json              | Contains npm dependencies as well as [build scripts](#what-if-a-library-isnt-on-definitelytyped)  |
| tsconfig.json             | Config settings for compiling source code only written in TypeScript                              |
| yarn.lock                 | Contains all dependencies or dev dependencies with complete details.                              |

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
