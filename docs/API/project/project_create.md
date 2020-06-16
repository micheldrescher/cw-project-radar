[back](../api.md)

# Create a new project in the radar

Create a new project entry in the radar database.

**Access level: manager**

## Request

* URL: `/api/v1/project`
* Method: `POST`
* URL Params: `n/a`
* Cookie: `jwt=...` (A user auhenticated with a manager role)
* Body Params:
    1. `name` - String - The project name (e.g. Cyberwatching.eu)
    1. `rcn` - Number - The unique RCN number provided by the EC to the project. Can be found in the EC's CORDIS portal.
    1. `title` - String - The full title of the project.
    1. `teaser` - The project teaser (from CORDIS)
    1. `startDate` - ISO date - The start date of the project
    1. `endDate` - ISO date - The end date of the project
* Body: 
```json
{
    "name": "Cyberwatching.eu",
    "rcn": 210202,
    "title": "The European watch on cybersecurity privacy",
    "teaser": "cyberwatching,eu addresses the DS-05 call by defining and promoting a pragmatic approach to implement and maintain an EU Observatory to monitor R&I initiatives on cybersecurity & privacy, throughout EU & Associated Countries. These initiatives will be clustered, with a...",
    "startDate":  "2017-05-01",
    "endDate":  "2021-04-30"
}
```
For more (optional) fields, see Project documentation
 

## Response

* Status code: `201 Created`
* Body Params: 
    1. `status` - String - The JSEND status of the response, in this case 'success'
    1. `data.doc` - Object - The details of the created project
        1. `hasClassifications` - Boolean - indicator whether the project has been classified or not
        1. `hasScores` - Boolean - indicator whether the project has MTRL scores attached or not
        1. `tags` - [String] - List of EC JRC taxonomy tags attached to the project
        1. `name` - String - The name of the project
        1. `rcn` - Boolean - the RCN of the project
        1. `title` - String - The full title of the project.
        1. `teaser` - The project teaser (from CORDIS)
        1. `startDate` - ISO date - The start date of the project
        1. `endDate` - ISO date - The end date of the project
        1. `cw_id` - The Cyberwatching ID assigned to the project.
* Body:
```json
{
    "status": "success",
    "data": {
        "doc": {
            "hasClassifications": false,
            "hasScores": false,
            "tags": [],
            "_id": "5ee8b42bff50d0461e213e06",
            "name": "Cyberwatching.eu",
            "rcn": 210202,
            "title": "The European watch on cybersecurity privacy",
            "teaser": "cyberwatching,eu addresses the DS-05 call by defining and promoting a pragmatic approach to implement and maintain an EU Observatory to monitor R&I initiatives on cybersecurity & privacy, throughout EU & Associated Countries. These initiatives will be clustered, with a...",
            "startDate": "2017-05-01T00:00:00.000Z",
            "endDate": "2021-04-30T00:00:00.000Z",
            "cw_id": 262,
            "__v": 0,
            "id": "5ee8b42bff50d0461e213e06"
        }
    }
}
```

OR

* Status code: `500 Internal Server Error`
* Body Params: 
    1. `status` - String - `error`
    1. `message` - String - A string detailing the error condition(s)
* Body: 
```json
{
    "status": "error",
    "message": "Project validation failed: rcn: Path `rcn` is required."
}
```

For further AuthN & AuthZ related error responses see [here](auth_generic_messages.md). 

[back](../api.md)
