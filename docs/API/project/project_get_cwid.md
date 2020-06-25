[back](../api.md)

# Get a project by Cyberwatching ID

Fetch project information using its Cyberwatching ID (internally assigned)

## Request

* URL: `/api/v1/project/prj_id/:cwid`
* Method: `GET`
* URL Params:
    1. cwid - the numeric ID assigned by Cyberwatching to identify the project in the radar
* Body Params: `n/a`

Example: `/api/v1/project/prj_id/13`

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
        ...
    }
}
```

[back](../api.md)
