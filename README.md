# Cyberwatching Project Radar

This Cyberwatching Project Radar is a rewrite of of the first attempt that was based on the original ThoughtWorks radar.

This version is written from scratch as a full stack application using Node.js, MongoDB, Mongoose, Express and a few other libraries.

## Running the Radar using Docker

TBD

## Setting up a local dev env

TBD

## REST API documentation

The REST API is functionally organised in four categories;

1. Authentication & Authorisation
2. User management
3. Project management
4. Radar management

Responses **always** use the JSEND way of sending responses (see https://github.com/omniti-labs/jsend for more details) regardless if the operation was successful or not.

#### Authentication & Authorisation

All API endpoints that go beyond displaying radars, and filtering projects according to taxonomy terms, require authentication and (role based) authentication.

User accounts are associated with a role (project, cw-hub, admin) that enables the user to interact with certain API endpoints. Admins are allowed to do everything (there is always at least one admin account available), a cw-hub user is allowed to do almost everything with radars and projects. The project role is currently not used.

[Detailed endpoint docs](/documentation/API/Auth.md).

#### User management

User management is 