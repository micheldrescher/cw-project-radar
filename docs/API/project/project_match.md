[back](../api.md)

# Match projects against taxonomy terms

**NOTE:**  Currently the taxonomy terms are all hardcoded - see common/datamodel/jrc-taxonomy for details.

Fetch the names of projects that match against a given set of taxonomy terms. This is used in the UI to filter for EC JRC taxonomy terms.

## Request

* URL: `/api/v1/project/match`
* Method: `POST`
* URL Params: `n/a`
* Body Params:
    1. `union` - String - Eitner `all` or anything else. Used for logical and/or-ing the result.
    1. `tags` - [String] - Array of matching strings. If empty or not present, all projects will match.
* Body:

```json
{
    "union": "all",
    "tags": "cryptology, incidentHandling"
}
```

## Response

* Status code: `200 OK`
* Body Params:
    1. `status` - the status of the response in JSEND format, in this case `success`
    1. `data` - The matching projects' Cyberwatching IDs
* Body: 
```json
{
    "status": "success",
    "data": [13, 22, 154]
}
```

[back](../api.md)
