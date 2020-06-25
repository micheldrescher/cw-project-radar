# User management

User account management is kept very simple, as these are expected to be technical rather actual 'user' accounts. However, users may change their passwords (and should do so regularly).

## PUBLIC API Endpoints 

No publicly accessible endpoints available.

## AUTHENTICATED endpoints

The following endpoints are available to logged in users.

### Change password

A logged in user changes their password.

Access level: LOGGED IN

**Request**
* Endpoint: ``
* Method: `PATCH`
* Content-Type: `application/json;charset=UTF-8`
* Parameters:
    1. `current` - String (required) - the current password
    1. `password` - String (required) - the new password
    1. `confirm` - String (required) - the new password confirmation (geared towards user interfaces)
* Body: 

**Response**

If successful, the response updates the JWT cookie to a new one reflecting the change of the password.

**Response (wrong current password)**

**Response (new passwords do not match)**

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

