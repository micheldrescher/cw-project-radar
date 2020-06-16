[back](../api.md)

# Add a category to the project

For projects to be included in the visualisation of the radar(s), they need to have been categorised accoding to the Cyberwatching Cybersecurity and Privacy Taxonomy.

Projects can be re-categorised, which begins to build a history of categorisations. This means that projects may show up in different segments across different radars. However, this hasn't happened as of the time of writing the documentation.

**Access level: manager**

## Request

* URL: `/api/v1/project/:cwid/categorise`
* Method: `POST`
* URL Params: 
    1. `:cwid` - Number - The Cyberwatching ID of the project
* Cookie: `jwt=...` The JWT issued when logging in as a manager
* Body Params: 
    1. `classification` - String - The (new) classification for the project. Must be one of the defined classification tokens.
    1. `changeSummary` - String - A free form string describing the rationale for the (re-)classification.
    1. *`classifiedBy`* - String - The origin of the classification, either "cyberwatching" or "project". OPTIONAL
    1. *`classifiedOn`*  - ISO date - The (retrospective) date the classification was made. OPTIONAL
* Body:
```json
{
    "classification": "Human Aspects",
    "classifiedBy": "Project",
    "changeSummary": "Initial classification was wrong.",
    "classifiedOn": "2018-08-01"
}
```

## Response

* Status code: `201 Created`
* Body Params:
    1. `data` - Object - The corresponding project to which the classification was added.
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
