[back](../api.md)

# Authentication & Authorisation errors - Generic responses

## User not logged in

A resource that requires a user to be logged in is accessed while not being logged in sends back this generic error response message.

* Status code: `401 Unauthorized`
* Body: 
```json
{
    "status": "fail",
    "message": "You are not logged in! Please log in to get access."
}
```

## User no longer exists

The JWT is valid, but the associated user account no longer exists.

* Status code: `401 Unauthorized`
* Body: 
```json
{
    "status": "fail",
    "message": "The user belonging to this token does no longer exist."
}
```

## Forbidden

Whenever a user is in logged in, but does not bear the required role the server will respond with:

* Status code: `403 Forbidden`
* Body: 
```json
{
    "status": "fail",
    "message": "You do not have permission to perform this action"
}
```

[back](../api.md)
