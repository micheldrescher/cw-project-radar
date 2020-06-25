[back](../api.md)

# Update project information

Use this endpoint to maintain, manage, change and update project information.

Add any of Project's fields into the body that you want updated, except the following that are managed through other means:
1. `cw_id`
1. `hasClassifications`
1. `hasScores`
1. `classification`
1. `mtrlScores`

**Access level: manager**

## Request

* URL: `/api/v1/project/:id` 
* Method: `PATCH`
* URL Params: 
    1. `:id` - ObjectID - The MongoDB ObjectID of the project
* Cookie: `jwt=...` The token issued when logged in as a manager
* Body Params: 
    1. Any Project field that you wish to update (see exceptions above). See Project documentation for the field descriptions.
* Body:
```json
{
    "type": "CSA",
    "budget": 1999895.63
}
```

## Response

* Status code: `200 OK`
* Body Params: 
    1. The updated project as a reference.
* Body:
```json
{
    "status": "success",
    "data": {
        "data": {
            "cw_id": 1,
            "rcn": 206338,
            "call": "EINFRA-22-2016",
            "type": "RIA",
            "type": "CSA",
            "budget": 1999895.63,
            "tags": [
                "securityMeasurements",
                "securityEngineering",
                "steganography"
            ],
            ...
        }
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
