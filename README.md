# Cyberwatching Project Radar

This Cyberwatching Project Radar is a rewrite of of the first attempt that was based on the original ThoughtWorks radar.

This version is based on a forked version of the expack repository initiated and maintained by Ben Grunfeld. The forked version of the original expak repository is available here: https://github.com/micheldrescher/expack-boilerplate All documentation for expack also applies here. Please visit https://github.com/bengrunfeld/expack for the original repository.

# Architecture

The yberwatching Project Radar is in essence a three tiered application comprising a browser client (mostly implemented in JavaScript), the server providing search and business logic functionality, and a NoSQL MongoDB.

A fourth component is the Cyberwatching.eu Project Hub, from where project maintainers can update certain project information that is then fed into the data store via the server's REST API.

# Installation

TBC

# REST API

The server REST API forms the central integration point for the application.

The client is served from the root of the server, i.e. https://server:port/

All REST functionality is served from the following base endpoint: https://server:port/api/v1

Documentation for the REST API v1 is [here](https://github.com/micheldrescher/cw-project-radar/blob/master/REST%20API%20v1.md).
