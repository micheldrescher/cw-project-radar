# Cyberwatching Project Radar

This Cyberwatching Project Radar is a rewrite of of the first attempt that was based on the original ThoughtWorks radar.

This version is written from scratch as a full stack application using Node.js, MongoDB, Mongoose, Express and a few other libraries.

## Running the Radar using Docker

1. [Download and install](https://docs.docker.com/get-docker/) Docker (and docker compose) for your target platform.
1. [Download](https://github.com/micheldrescher/cw-project-radar/archive/master.zip) this repository as a ZIP file, or clone it using Git: `git clone https://github.com/micheldrescher/cw-project-radar.git`
1. CD into the project repository
1. Run the command `docker-compose up` to assemble the docker images and start the Project Radar.
1. Open http://localhost:8080/user/login, log in as 'admin' using the password 'temporary'.
1. Browse to `http://localhost:8080/user/account` and change the initial admin account's password.

This will give you a blank Cyberwatching Project Radar application in production mode.

Play around with adding users, projects, radars, MTRL scores and classifications.

### Adding Cyberwatching baseline data

Cyberwatching.eu regularly publishes baseline data extracted from its production service in this repository.





## Setting up a local dev env

TBD

## REST API documentation

API documentation has moved [here](docs/API/api.md).