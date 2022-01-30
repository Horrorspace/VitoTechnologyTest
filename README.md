# VitoTechnologyTest


## Install database

To install CouchDB database go to the link: [Apache CouchDB download](https://couchdb.apache.org/#download "Apache CouchDB download") and download Apache CouchDB for yours OS. Then follow to directions posted on the Apache CouchDB website.


## Clone repository

To clone repository run `git clone https://github.com/Horrorspace/VitoTechnologyTest`.


## Install dependencies

1. Run `cd VitoTechnologyTest` to go app directory.
2. Run `npm install` to install dependencies.


## Build the app

To build the app run `npm run build`.


## Setting up database

1. Create file, which named `.production.env`, containing the following variables:
* PORT - port number on which the app will run;
* DB_PROTOCOL - protocol of your database (http or https);
* DB_HOST - hostname of your database (e.g. localhost);
* DB_PORT - port number on which your database run;
* DB_USERNAME - login to connect to your database;
* DB_PASSWORD - password to connect to your database;
2. Run `npm run createDB`.


## Launching

To launch the app run `npm start`. After that app will be lauched on port, which specified in .production.env file.

Open `http://localhost:${YOUR_PORT_NUMBER}/graphql` on your browser to see playground.