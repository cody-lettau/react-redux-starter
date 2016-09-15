# React & Redux Project Seed

## Production Notes
* To build and pack (from /src), run: ```npm run build```
  * This will build and webpack into a /build directory in the root of the project, containing the following:
    * js/
      * debug/
        * client_bundle.js
      * client_bundle.js
    * index.html
    * server_bundle.js
  * The /debug directory is used for debugging in production.
    * In production, you can enable debug mode by adding ```?debug_mode=true``` to the end of the URL
      * This will retrieve the client_bundle.js with sourcemaps included
* The /build directory can then be distributed.
* To start the application for production, run: ```PORT=5000 NODE_ENV=production node server_bundle.js```

## Development Notes
* To build and pack for development, you also run: ```npm run build```
  * Individual build commands:
    * ```npm run build-client``` -- Production Client build
    * ```npm run build-client-debug``` -- Dev (Debug) Client build
    * ```npm run build-server``` -- Production Server
  * Note: The above build commands will not enable linting. To run the linter, run:
    * ```npm run lint-client``` or ```npm run lint-client-report``` to generate an HTML report
    * ```npm run lint-server``` or ```npm run lint-server-report``` to generate an HTML report
    * Alternatively, you can run ```npm run lint``` or ```npm run lint-reports``` to run both of the above.
* To start the application for development, run:
  * ```npm run start-dev``` -- Run using node pointing at /build/debug directory
  * ```npm run dev``` -- Run using nodemon pointing at /client for Client source and /build for Server source
* To start the application with live-reload from the /src direcotry, run:
  * ```npm run dev-server```
    * This will run the app at http://localhost:8080
    * This will also enable linting when a file is saved
* To run the unit tests, you can run either of the following:
  * ```npm run test```
  * ```npm run test:watch```
* To run coverage reports, you can run either of the following:
  * ```npm run cover```
  * ```npm run cover:teamcity```

## Technologies & Resources
Below you will find resource links for many of the different technologies used within this project seed. Please refer to the ```package.json``` file to find the specific version of a library being used. We do our best to keep these up to date with the latest release.

#### Frameworks / Libraries / Tools
|Type            | Name                    | Link                                                          |
|:---------------|:------------------------|:-------------------------------------------------------------:|
| Client         | React                   | [Link](https://facebook.github.io/react/)                     |
| Client         | Redux                   | [Link](http://redux.js.org/)                                  |
| UI Design      | Material UI             | [Link](http://www.material-ui.com/#/)                         |
| I18N           | i18n-react              | [Link](https://github.com/alexdrel/i18n-react)                |
| Server         | Express                 | [Link](https://expressjs.com/)                                |
| Build          | Webpack                 | [Link](https://webpack.github.io/)                            |
| Build          | Babel                   | [Link](https://babeljs.io/)                                   |
| Testing        | Mocha                   | [Link](https://mochajs.org/)                                  |
| Testing        | Sinon                   | [Link](http://sinonjs.org/)                                   |
| Testing        | Chai                    | [Link](http://chaijs.com/api/bdd/)                            |
| Testing        | Enzyme                  | [Link](http://airbnb.io/enzyme/index.html)                    |
| Testing        | Supertest               | [Link](https://github.com/visionmedia/supertest)              |
| Testing        | JSDom                   | [Link](https://github.com/tmpvar/jsdom)                       |
| Linting        | ESLint                  | [Link](http://eslint.org/)                                    |
| Linting        | AirBnB ESLint Config    | [Link](https://github.com/airbnb/javascript)                  |

#### Tutorials / Learning Resources
|Type            | Name                    | Link                                                                         |
|:---------------|:------------------------|:----------------------------------------------------------------------------:|
| Client         | Redux Tutorial Videos   | [Link](https://egghead.io/courses/getting-started-with-redux)                |
| Client         | Redux Intro             | [Link](https://www.codementor.io/reactjs/tutorial/intro-to-react-redux-pros) |
| Client         | ES2015 Tutorial         | [Link](https://babeljs.io/docs/learn-es2015/)                                |
