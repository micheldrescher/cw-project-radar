[back](../api.md)

# Fetching a list of published radar editions

Find out how many, and which radar editions are publicly available.

## Request

* URL: `/api/v1/radar/editions`
* Method: `GET`
* URL Params: `n/a`
* Cookie: `jwt=...` (The session cookie from logging in)
* Body Params: `n/a`

## Response

* Status code: `200 OK`
* Body Params:
    1. `status` - the status of the response in JSEND format, in this case `success`
    1. `results` - the number of published radar editions (0 or more)
    1. `data` - an array of published radars. Empty if no radars are published. 
        1. `_id` - the ObjectId of the stored radar
        1. `slug` - the short name/identifier of the radar
        1. `name` - the name of the radar
* Body: 
```json
{
    "status": "success",
    "results": 4,
    "data": [
        {
            "_id": "5e905641a4f5467bec36befb",
            "slug": "spring-2020",
            "name": "Spring 2020"
        },
        ...
    ]
}
```

OR

* Status code: `500 Internal Server Error`
* Body: 
```json
{
    "status": "error",
    "message": "Could not fetch radar editions. Contact system administrator."
}
```

[back](../api.md)
