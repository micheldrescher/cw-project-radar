[back](../api.md)

# Get a project by RCN

Fetch project information using its unique RCN (assigned by the EC).

## Request

* URL: `/api/v1/project/rcn/:rcn`
* Method: `GET`
* URL Params:
    1. rcn - the numeric rcn assigned by the EC Cyberwatching to this project
* Body Params: `n/a`

Example: `/api/v1/project/rcn/202697`

## Response

* Status code: `200 OK`
* Body Params:
    1. `status` - the status of the response in JSEND format, in this case `success`
    1. `data` - the project's data. Refer to the Project model documentation for more info.
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

* Status code: `400 Bad Request`
* Body: 
```json
{
    "status": "fail",
    "message": "Missing or non-number rcn in request."
}
```

OR

* Status code: `404 Not Found`
* Body: 
```json
{
    "status": "fail",
    "message": "No project found with rcn 202697."
}
```

[back](../api.md)
