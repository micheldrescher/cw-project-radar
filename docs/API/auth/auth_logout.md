[back](../api.md)

# Logging out

Logging out of the project radar service. 

To succeed, you must be logged in.

## Request

* URL: `/api/v1/user/logout`
* Method: `GET`
* Cookie: `jwt=...` (The session cookie from logging in)
* URL Params: `n/a`
* Body Params: `n/a`

## Response

* Status code: `200 OK`
* Body: 
```json
{
    "status": "success"
}
```

For further AuthN & AuthZ related error responses see [here](auth_generic_messages.md).

[back](../api.md)


