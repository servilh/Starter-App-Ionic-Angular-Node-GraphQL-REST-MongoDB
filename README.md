# Template-Starter-Ionic-Angular-Node-GrahpQL-REST-MongoDB-Docker-App

## Getting starter

This and starter template full app for projects using Ionic / Angular as front, and Node in Backend. Application will be prepare for fetch and update data using REST or GRAPHQL interfaces.

Project is divide in three subfolders:

- front-ionic-angular: contains the client app developed with Angular 13 and Ionic 6
- back-node-mongo-docker: contains the server part to be powered by dockers.
- common: contains data model structures used by both parts, client and server. Common only will have the interface model, if as business logic is need in server or client part, class should be extended in the client / server project.

## Back end

This project is and Node Server prepare to use Typescript. 

#### Features

- **MongoDB**: examples how to CRUD and object via MongoDB.
- **GraphQL Service**: example how to create a GraphQL Schema to interact with database objects. Powered by Apollo Express GraphQL 
- **REST Service**: example how to prepare GET, POST, PUT, DELETE route for and object. Powered by Express
- **Hot-Reloading**: modify a file an solution will be restarted automatically. Powered by Nodemon 
- **Docker**: prepared to run in dockers the MongoDB and NodeJS service.

#### How to run it

- Follow Readme inside backend folder in order to run it

## Front end 

This project is an Ionic / Angular client template to manage data via  REST and GRAPHQL interfaces.

You could check how to code CRUD (Create Read Update Delete) operations through your server.

#### Features

- **MultiLanguge**: Examples how to use ngx-translate for a multilanguage app
- **Unit Testing**: Examples how to use Jasmine and Karma
- **Dinaminc Form Component**: custom component which creates a form for edit/visualize an object of a given a class. In this component you could see how to create your DOM elements passing arguments.
- **REST client using Observables** using Observables in order to manage HttpClient calls. Examples how to use RXJS.
- **Graphql**: examples how to use Grahql to update and fetch data, using graph cache with differents approachs. Examples how to use Apollo/client

#### How to run it

Create a console in front-ionic-angular folder an run:

- ionic serve

To run Testing with Karma / Jasmine test 
- npm test
