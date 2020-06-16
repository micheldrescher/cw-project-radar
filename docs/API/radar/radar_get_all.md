[back](../api.md)

# Get all radars

Fetch all radars from the system.

## Request

* URL: `/api/v1/radar`
* Method: `GET`
* URL Params: `n/a`
* Body Params: `n/a`

## Response

* Status code: `200 OK`
* Body Params:
    1. `status` - the status of the response in JSEND format, in this case `success`
    1. `results` - the number of published radar editions (0 or more)
    1. `data.data` - an array of published radars. Empty if no radars are published. 
       Refer to Radar description for more info about the radar fields.
* Body: 
```json
{
    "status": "success",
    "results": 4,
    "data": {
        "data": [
            {
                "_id": "5e905641a4f5467bec36befc",
                "slug": "autumn-2020",
                "name": "Autumn 2020",
                "status": "created",
                ...
            },
            ...
        ]
    }
}
```

For further AuthN & AuthZ related error responses see [here](auth_generic_messages.md).

[back](../api.md)
