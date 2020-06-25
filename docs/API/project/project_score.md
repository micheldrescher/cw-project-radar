[back](../api.md)

# Post an MTRL score for a project

Whenever a project offers a new MTRL score, use this endpoint to save it to the radar.

**Access level: manager **

## Request

* URL: `/api/v1/project/:cwid/score`
* Method: `POST`
* URL Params:
    1. `:cwid` - Number - The Cyberwatching ID of the project
* Cookie: `jwt=...` The JWT issued when logging in as a manager
* Body Params:
    1. `mrl` - Number - The Market Readiness Level (MRL) value. Between 0 and 9.
    1. `trl` - Number - The Technology Readiness Level (MRL) value. Between 0 and 9.
* Body:
```json
{
	"mrl": 4,
    "trl": 3
}
```

## Response

** Status code: `201 Created`
* Body Params:
    1. `data` - Object - The corresponding project to which the MTRL score was added.
* Body:
```json
{
    "status": "success",
    "data": {
        "_id": "5e9055de1c16f47b348f66cc",
        "name": "CANVAS",
        "cw_id": 13,
        "rcn": 202697,
        ...
   }
}
```

OR

* Status code: `404 Not Found`
* Body Params: 
    1. `message` - String - The error message indicating that the requested project was not found.
* Body:
```json
{
    "status": "fail",
    "message": "No document found with that ID"
}
```

For further AuthN & AuthZ related error responses see [here](../auth/auth_generic_messages.md). 

[back](../api.md)
