# REST API documentation

The REST API is functionally organised in four categories;

1. Authentication & Authorisation
1. Radar management
1. Project management
1. User management

Responses **always** use the JSEND way of sending responses (see https://github.com/omniti-labs/jsend for more details) regardless if the operation was successful or not.

## Overview

#### Authentication & Account

Path                          | Method | Access        | Description
------------------------------|--------|---------------|----------------------------------------
`/api/v1/user/login`          | POST   |               | Logging in. [more...](auth/auth_login.md)
`/api/v1/user/logout`         | GET    | authenticated | Loggin out. [more...](auth/auth_logout.md)
`/api/v1/user/updatePassword` | PATCH  | authenticated | Change the currently logged in user's password. [more...](auth/auth_password.md)

#### Radar 

Path                                  | Method | Access    | Description
--------------------------------------|--------|-----------|----------------------------------------
`/api/v1/radar/editions`              | GET    |           | Get a list of published radar editions [more...](radar/radar_editions.md)
`/api/v1/radar`                       | GET    | manager   | Get a list of all radar instances [more...](radar/radar_get_all.md)
`/api/v1/radar`                       | POST   | manager   | Create a new radar instance
`/api/v1/radar/:slug`                 | GET    | manager   | Get full radar details
`/api/v1/radar/:id`                   | PATCH  | manager   | Update radar 
`/api/v1/radar/:id`                   | DELETE | manager   | Delete a radar
`/api/v1/radar/:slug/populate/:date?` | PATCH  | manager   | Populate a radar with project information.
`/api/v1/radar/:slug/render`          | PATCH  | manager   | Render the radar visualisation into SVG
`/api/v1/radar/:slug/publish`         | PATCH  | manager   | Publish the radar for public access
`/api/v1/radar/:slug/archive`         | PATCH  | manager   | Archive the radar 
`/api/v1/radar/:slug/reset`           | PATCH  | manager   | Reset radar to pre-populated state

#### Project

Path                               | Method | Access    | Description
-----------------------------------|--------|-----------|----------------------------------------
`/api/v1/project/prj_id/:cwid`     | GET    |           | Get public project data using its Cyberwatching ID [more...](project/project_get_cwid.md)
`/api/v1/project/rcn/:rcn`         | GET    |           | Get public project data using its RCN [more...](project/project_get_rcn.md)
`/api/v1/project/match`            | POST   |           | Get the Cyberwatching IDs of projects that for the POSTed taxonomy terms [more...](project/project_match.md)
`/api/v1/project/search`           | POST   |           | Full-text search of projects matching the POSTed search terms. [more...](project/project_search.md)
`/api/v1/project`                  | GET    | manager   | Get all projects 
`/api/v1/project`                  | POST   | manager   | Create new project. [more...](project/project_create.md)
`/api/v1/project`                  | PATCH  | manager   | Import projects from the uploaded file
`/api/v1/project/:id`              | GET    | manager   | Get project info
`/api/v1/project/:id`              | PATCH  | manager   | Update project data. [more...](project/project_update.md)
`/api/v1/project/:id`              | DELETE | manager   | Delete project
`/api/v1/project/:cwid/categorise` | POST   | manager   | Add a new categorisation to a project. [more...](project/project_categorise.md)
`/api/v1/project/:cwid/score`      | POST   | manager   | Add a new MTRL score for the project. [more...](project/project_score.md)

#### User

Path                          | Method | Access    | Description
------------------------------|--------|-----------|----------------------------------------
`/api/v1/user/`               | GET    | admin     | Get all user accounts in the service
`/api/v1/user/`               | POST   | admin     | Create a new user account
`/api/v1/user/:id`            | GET    | admin     | Get account detail of the requested user
`/api/v1/user/:id`            | PATCH  | admin     | Update account details (not password!)
`/api/v1/user/:id`            | DELETE | admin     | Delete user account
`/api/v1/user/:id/password`   | PATCH  | admin     | Change user account password

## Authorisation and Authentication model

Most of the available endpoints are protected hence not available for public, anonymous use.

The Cyberwatching Project Radar implements a simplified RBAC (role based access control) model with for "levels" of access control. Strictly speaking, each authenticated user must have a role assigned, however these roles are currently hierarchical, as follows:

Role          | Description
--------------|------------
public        | No authorisation required, i.e. public anonymous access to the resource
authenticated | A 'user' must be logged in (i.e. a JWT cookie must be sent with the request)
manager       | Managers are allowed to perform most create, update and delete operations on radars, projects, and users.
admin         | An admin is allowed to do everything on the server.

To this end the AuthN & AuthZ model implements a number of generic error messages that may be sent as response to any of the endpoints:

Error condition       | HTTP response code  | API error message 
----------------------|---------------------|------------------
User not logged in    | `401 Unauthorized`  | `You are not logged in! Please log in to get access.`
User no longer exists | `401 Unauthorized`  | `The user belonging to this token does no longer exist.`
Access denied         | `403 Forbidden`     | `You do not have permission to perform this action.`

[More details](auth/auth_generic_messages.md)

## Data model

The data model for the Project Radar comprises of five major components that are accessible via the REST API to controll the behaviour and contents of the application:

Component      | Description
---------------|------------
User           | Models both end users (typically admins) and programmatic agents (typically managers of data) that access and manipulate instances and contents of the other components. [more...](user/user_model.md)
Radar          | A Radar comprises a snapshot of classified projects with or without MTRL scores that is rendered for visual display and analysis. [more...](radar/radar_model.md)
Project        | Projects collate static information about an EC funded project such as start and end time, funding call, budget, etc.
MTRL Score     | A MTRL Score documents a Project's maturity in Technology and go-to-market strategy at a given point in time.
Classification | A Classification models where it belongs in the Cyberwatching sybersecurity and privacy (CS & P) research taxonomy. The segments of a Radar are based on the six second-tier in the CS & P taxonomy.
