# Cyberwatching Project Radar

This Cyberwatching Project Radar is a rewrite of of the first attempt that was based on the original ThoughtWorks radar.

This version is based on a forked version of the expack repository initiated and maintained by Ben Grunfeld. The forked version of the original expak repository is available here: https://github.com/micheldrescher/expack-boilerplate All documentation for expack also applies here. Please visit https://github.com/bengrunfeld/expack for the original repository.

# Installation

## Mongo DB setup

There are a variety of ways to provision a MongoDB database. While not suitable for production use, you can use a sandbox instance in the MongoDB cloud (MongoDB Atlas) at https://www.mongodb.com/cloud/atlas using their free of charge M0 tier offering.

Either way, you'll need a MongoDB database with a connect string, and user credentials (used later in the setup process)

## Installing the application

Clone the repository: `git clone https://github.com/micheldrescher/cw-project-radar.git`

Next, cd into the repository directory and install all dependencies: `npm install` (this might take a while)

## Configuration

In the repository directory, copy the config.env tempate file into a working copy: `cp config.env.template config.env`

Open config.env in a text editor, and fill in the required information ** for all field** (DB connection URL, DB user, DB password, etc.)

## Building and running

Next up, do a development build or a production build: `node run buildDev` or `node run buildProd` respectively.

To start the server, run: `node start`

Open a browser tab and go to `http://localhost:8080`

# Architecture

The yberwatching Project Radar is in essence a three tiered application comprising a browser client (mostly implemented in JavaScript), the server providing search and business logic functionality, and a NoSQL MongoDB.

A fourth component is the Cyberwatching.eu Project Hub, from where project maintainers can update certain project information that is then fed into the data store via the server's REST API.

# REST API

The server REST API forms the central integration point for the application.

The client is served from the root of the server, i.e. https://server:port/

All REST functionality is served from the following base endpoint: https://server:port/api/v1

Documentation for the REST API v1 is [here](https://github.com/micheldrescher/cw-project-radar/blob/master/REST%20API%20v1.md).
