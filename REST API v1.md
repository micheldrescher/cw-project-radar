# Cyberwatching Project Radar REST API v1

The radar application comprises three major components in a classic three tier application.

All interaction between the client components and the application is done via a REST API as described in this document.

At the time of writing, the main client (as a browser based UI) is not available yet, but you can test the API using Postman (https://www.getpostman.com) or other tools.

## API base URI

The REST API is accessible through the base URI `/api/v1` appended to the server location, like so: `http://localhost:8080/api/v1`. This needs to be completed by the API routes as described below to receive meaningful responses to your requests.

## Messaging principles

The REST API makes use of a variety of HTTP methods as per REST manifesto, e.g. GET, POST, PATCH, DELETE.

### Requests

Where requests carry a body (e.g. POST, PATCH) the body is expected to be encoded as direct application/json documents without any wrappers.

Example: **TBD**

### Responses

Responses make extensive use of HTTP status codes as per REST manifesto. Generally, server and internal faults are coded in the 500 status range; invalid, malformed or otherwise input data related errors are reported in the 400 status code range. Successful operations are returned with an appropirate status code in the 200 range.

Responses **always** use the JSEND way of sending responses (see https://github.com/omniti-labs/jsend for more details) regardless if the operation was successful or not.

## User management

The application makes use of a few technical users (admin, and data maintainers), it is not offering any infrastructure or support for the general public to create user accounts.

However, the general flow of user management, authentication and authorisation follows the typical process for end users with the exception of account creation - there is no signup and email based verification infrastructure. Instead, users are created using API routes.

### Logging on

For any and all protected API routes, a user must be logged on first.

#### Request

Send a POST request with the body carrying a JSON object containing the username and password.

1. Route: `/api/v1/user/login`
1. Method: POST
1. Parameters:
    1. `username` - String (required)
    1. `password` - String (required)

** Example:**
```json
{ 
    "name": "testadmin", 
    "password": "admin123" 
}`

#### Response

A successful login attempt will be acquitted with a HTTP 200 OK response carrying the JWT token (representng the login session) and the user details:

1. Status code: 200 OK
1. Body:
    1. `status` (success, fail, or error)
    1. `token` (the JWT token)
    1. `data`
        1. `user`
            1. `_id` (the MongoDB system-wide unique id)
            1. `name`
            1. `role`

**Example:**
```JSON
{
    "status": "success",
    "token":                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMTQ3YWFkMWNhZjM0YTZiNzc4ZWRjNiIsImlhdCI6MTU3ODQwMDUxNywiZXhwIjoxNTgwOTkyNTE3fQ.OlQHf0WE9X3zfX0L0dRxVYXDWEr_rimdqMGlWVUDe30",
    "data": {
        "user": {
            "role": "admin",
            "_id": "5e147aad1caf34a6b778edc6",
            "name": "testadmin"
        }
    }
}`

### Logging off

### Get all users (admin user only)

### Get specific user (admin user only)

### Create user (admin user only)

### Delete user (admin user only)
