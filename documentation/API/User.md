# User management

User account management is kept very simple, as these are expected to be technical rather actual 'user' accounts. However, users may change their passwords (and should do so regularly).

## PUBLIC API Endpoints 

The following operations are implemented:

### Change password

A logged in user changes their password.

Access level: LOGGED IN

**Request**
* Endpoint: `/api/v1/user/updatePassword`
* Method: `PATCH`
* Content-Type: `application/json;charset=UTF-8`
* Parameters:
    1. `current` - String (required) - the current password
    1. `password` - String (required) - the new password
    1. `confirm` - String (required) - the new password confirmation (geared towards user interfaces)
* Body: 
```json
{ 
    "current": "oldpassword", 
    "password": "newpassword" ,
    "confirm": "newpassword" ,
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

If successful, the response updates the JWT cookie to a new one reflecting the change of the password.

**Response (wrong current password)**
* Status code: `401 Unauthorized `
* Content-Type: `application/json; charset=utf-8`
* Body: 
```json
{
    "status": "fail",
    "error": {
        "statusCode": 401,
        "status": "fail",
        "isOperational": true
    },
    "message": "Your current password is wrong."
}
```

**Response (new passwords do not match)**
* Status code: `400 Bad Request`
* Content-Type: `application/json; charset=utf-8`
* Body: 
```json
{
    "status": "fail",
    "message": "Passwords are not the same."
}
```

## RESTRICTED API Endpoints 

### List all users

Obtain a list of all users configured in the system

Access level: ADMIN

**Request**
* Endpoint: `/api/v1/user/`
* Method: `GET`
* Cookie: `jwt=...`
* Content-Type: n/a
* Parameters: n/a
* Body: n/a

**Response**
* Status code: `200 OK`
* Content-Type: `application/json; charset=utf-8`
* Body: 
```json
{
    "status": "success",
    "results": 1,
    "data": {
        "data": [
            {
                "role": "admin",
                "_id": "5e90544685e0a968e5eea8c6",
                "name": "admin",
                "email": "cyber@cyberwatching.eu"
            },
            ...
        ]
    }
}
```

