[back](../api.md)

# Changing your password

As a logged in user, programmatically change the password for your account.

If successful, the server will respond with issuing a new JWT.

## Request

* URL: `/api/v1/user/updatePassword`
* Method: `PATCH`
* Cookie: `jwt=...` (The session cookie from logging in)
* URL Params: `n/a`
* Body Params:
    1. `current` - String (required) - the current password
    1. `password` - String (required) - the new password
    1. `confirm` - String (required) - the new password confirmation (geared towards user interfaces)
Example:
```json
{ 
    "current": "oldpassword", 
    "password": "newpassword" ,
    "confirm": "newpassword" ,
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

* Status code: `401 Unauthorized `
* Body: 
```json
{
    "status": "fail",
    "message": "Your current password is wrong."
}
```

OR

* Status code: `400 Bad Request`
* Content-Type: `application/json; charset=utf-8`
* Body: 
```json
{
    "status": "fail",
    "message": "Passwords are not the same."
}
```

For further AuthN & AuthZ related error responses see [here](auth_generic_messages.md).

[back](../api.md)
