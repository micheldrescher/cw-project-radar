# Authentication

Authentication and authorisation uses simple username and password credentials. 

The Project Radar uses JSON Web Tokens (JWT) to represent a successful login claim. When logged in usccessfully, the server issues a JWT as a cookie that expires after one month, scoped for the origin server only. 

## API Endpoints 

The following operations are implemented:

### Logging in

Access level: PUBLIC

**Request**

* Endpoint: `/api/v1/user/login`
* Method: `POST`
* Content-Type: `application/json;charset=UTF-8`
* Parameters:
    1. `name` - String (required)
    1. `password` - String (required)
* Body: 
```json
{ 
    "name": "testadmin", 
    "password": "admin123" 
}
```

**Response**
* Status code: `200 OK`
* Set-Cookie: `jwt=...`
* Content-Type: `application/json; charset=utf-8`
* Body: 
```json
{
    "status": "success",
    "token": ...,
    "data": {
        "user": {
            "role": "admin",
            "_id": "5e90544685e0a968e5eea8c6",
            "name": "admin",
            "email": "cyber@cyberwatching.eu"
        }
    }
}
```

**Response (incomplete information)**
* Status code: `400 Bad Request`
* Content-Type: `application/json; charset=utf-8`
* Body: 
```json
{
    "status": "fail",
    "message": "Please provide name and password!"
}
```

**Response (failure)**
* Status code: `401 Unauthorized`
* Content-Type: `application/json; charset=utf-8`
* Body: 
```json
{
    "status": "fail",
    "message": "Incorrect name or password"
}
```

### Logging out

Access level: LOGGED IN

**Request**
* Endpoint: `/api/v1/user/logout`
* Method: `GET`
* Cookie: `jwt=...`
* Parameters: n/a
* Body: n/a

**Response**
* Status code: `200 OK`
* Content-Type: `application/json; charset=utf-8`
* Body: 
```json
{
    "status": "success"
}
```

## Access levels and authorisation error messages

Most of the endpoints are protected and not publicly accessible. To indicate the level of authorisation required for successful access, the documentation uses the following indicators:

Access level | Auth error type | Description
-------------|-----------------|------------
PUBLIC       | n/a             | No authorisation required 
LOGGED IN    | Unauthorised    | A 'user' must be logged in (i.e. a JWT cookie must be sent with the request)
CW-HUB       | Forbidden       | A user with the role 'cw-hub' must be logged in to access this endpoint
ADMIN        | Forbidden       | A user account with the admin role must be logged in to access this endpoint

### Unauthorised

#### Not logged in
Whenever a user is not logged in (i.e. has not presented a JWT cookie) the server will respnd with:

* Status code: `401 Unauthorized`
* Content-Type: `application/json; charset=utf-8`
* Body: 
```json
{
    "status": "fail",
    "message": "You are not logged in! Please log in to get access."
}
```

#### User no longer exists
The JWT is valid, but the associated user account no longer exists. THe server will respond with: 
* Status code: `401 Unauthorized`
* Content-Type: `application/json; charset=utf-8`
* Body: 
```json
{
    "status": "fail",
    "message": "The user belonging to this token does no longer exist."
}
```

### Forbidden

Whenever a user is in fact logged in, but does not bear the required role the server will respnd with:

* Status code: `403 Forbidden`
* Content-Type: `application/json; charset=utf-8`
* Body: 
```json
{
    "status": "fail",
    "message": "You do not have permission to perform this action"
}
```
