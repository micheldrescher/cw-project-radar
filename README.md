# Cyberwatching Project Radar

This Cyberwatching Project Radar is a rewrite of of the first attempt that was based on the original ThoughtWorks radar.

This version is written from scratch using the following components:
1. Data storage:
  * MongoDB 
2. Application layer:
  * Node.js v13
  * Express (REST API processing)
  * Mongoose (for enhanced data access)
  * D3s (rendering the radar in SVG)
3. Presentation layer
  * Plain Javascript
  * D3s to make the radar interactive
  * Axios to make REST calls to the app layer

# Setting up a Dev Env

This guide will get you up and running with a **local development environment** running entirely on your laptop or workstation. A guide for a production or distributed system will follow later.

## Local MongoDB server

1. Download MongoDB from https://www.mongodb.com/download-center/community
2. Follow installation instructions on how to set it up and start from the command line.
3. Start MongoDB from the command line, usually using `mongod`.

### Installing MongoDB Compass

MongoDB Compass is useful for administration and inspection of the project database.

1. Get Compass from here: https://www.mongodb.com/products/compass
2. Install as per installation instructions
3. Connect to the local database, ensuring that you can connect.

## Installing the Application Layer

The entire application layer (along with the presentation layer) is kept in a GitHub repository. You need to clone it, install node packages, and configure your environment before you can run it.

##### Prerequisites:
1. Git installed locally and accessible from command line
2. Node.js v13 (https://nodejs.org/en/)

### Setting up the Node.js/Git environment
1. On the command line, go to or create the directory in which you want to have the code repository installed
2. Clone the GitHub repository: `git clone https://github.com/micheldrescher/cw-project-radar.git`
3. Cd into the sub-directory `cw-project-radar`
4. Install all required modules: `npm install`

### Configuring the environment

The project uses a configuration file named `.env` to flexibly connect to a local or remote MongoDB, configure JWT user auth token parameters, and general radar configuration. **This file is mandatory for the application layer to run.**

For security purposes, the actual `.env` file must be generated from a template, `.eng.template`, which provides documentation and sample entries for illustration. **Do not use the examples for production configuration.**

1. Create a config file from the template: `cp .env.template .env`
2. Edit .env and add appropriate values
3. **Secure `.env` against unauthorised access.** (It contains cleartext passwords)

## Populating the database

The project includes import scripts and data bringing your local dev env to the state of February 2020.

1. Open a terminal and cd into the project directory (e.g. `cd cw-project-radar`)
2. Execute the following commands:
    * `npm run init:projects`
    * `npm run init:classifications`
    * `npm run init:mtrl`
    * `npm run npm run init:radars`

This imports all the data. To display radars in the system, you need to "populate", "render" and publish them as follows. The {{{URL}}} is the server address (typically localhost:3000): 

```bash
curl localhost:3000/api/v1/radar/autumn-2018/populate/2018-11-01
curl localhost:3000/api/v1/radar/spring-2019/populate/2018-05-01
curl localhost:3000/api/v1/radar/autumn-2019/populate/2019-11-01
curl localhost:3000/api/v1/radar/autumn-2018/render
curl localhost:3000/api/v1/radar/spring-2019/render
curl localhost:3000/api/v1/radar/autumn-2019/render
curl localhost:3000/api/v1/radar/autumn-2018/publish
curl localhost:3000/api/v1/radar/spring-2019/publish
curl localhost:3000/api/v1/radar/autumn-2019/publish
```
## Starting the server in development mode

1. Open a terminal and cd into the project directory (e.g. `cd cw-project-radar`)
2. Start the server by executing `npm run dev`

Whenever you make changes to code the server will detect this and restart automatically.

## Accessing the Presentation Layer

1. Open a new browser tab and point it to `https://localhost:8080` (or any other port you configured previously)

## Dev Env toolkit

The preferred environment for this project uses:
1. MongoDB Compass (already installed)
2. Postman (to test and develop the REST API) - https://www.postman.com/
    * A collection of Postman messages and configuration is shipped with the repository: `postmane_collection.json`

