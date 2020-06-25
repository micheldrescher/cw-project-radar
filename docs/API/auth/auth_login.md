[back](../api.md)

# Logging in

Logging into the radar. If a matching pair of username and password are provided, the server generates and issues a JWT (JSON Web Token) representing the current session until logged out or the JWT expires. 

Any request to a resource that requires at least an authenticated user requires the JWT to be sent along as a coockie.

For security reasons, the endpoint expects the transport layer to be encrypted, as passwords are transmitted in cleartext.

## Request

* URL: `/api/v1/user/login`
* Method: `POST`
* URL Params: `n/a`
* Body Params:
   * `name`: String - The username
   * `password`: String - The corresponding password (in cleartext)
Example:
```json
{  
    "name": "testadmin", 
    "password": "admin123" 
}
```

## Response

* Status code: `200 OK`
* Set-Cookie: `jwt=...`
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

OR

* Status code: `400 Bad Request`
* Body: 
```json
{
    "status": "fail",
    "message": "Please provide name and password!"
}
```

OR

* Status code: `401 Unauthorized`
* Body: 
```json
{
    "status": "fail",
    "message": "Incorrect name or password"
}
```

[back](../api.md)
