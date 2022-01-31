# VitoTechnologyTest


## Install database

To install CouchDB database go to the link: [Apache CouchDB download](https://couchdb.apache.org/#download "Apache CouchDB download") and download Apache CouchDB for yours OS. Then follow to directions posted on the Apache CouchDB website.


## Clone repository

To clone repository run `git clone https://github.com/Horrorspace/VitoTechnologyTest`.


## Install dependencies

1. Run `cd VitoTechnologyTest` to go app directory.
2. Run `npm install` to install dependencies.


## Setting up database

1. Create file, which named `.production.env`, containing the following variables:
* PORT - port number on which the app will run;
* DB_PROTOCOL - protocol of your database (http or https);
* DB_HOST - hostname of your database (e.g. localhost);
* DB_PORT - port number on which your database run;
* DB_USERNAME - login to connect to your database;
* DB_PASSWORD - password to connect to your database;
2. Run `npm run createDB`.


## Build the app in development mode

1. Create file, which named `.development.env`, containing the following variables:
* PORT - port number on which the app will run;
* DB_PROTOCOL - protocol of your database (http or https);
* DB_HOST - hostname of your database (e.g. localhost);
* DB_PORT - port number on which your database run;
* DB_USERNAME - login to connect to your database;
* DB_PASSWORD - password to connect to your database;
2. Run `npm run dev` to build the app in development mode. After that app will be built in watch mode.


## Build the app in production mode

To build the app in production mode run `npm run build`.


## Launching in development mode

To launch the app run `npm run serve`. After that app will be lauched in watch mode on port, which specified in .production.env file.

Open `http://localhost:${YOUR_PORT_NUMBER}/graphql` on your browser to see playground.


## Launching in production mode

To launch the app run `npm start`. After that app will be lauched on port, which specified in .production.env file.