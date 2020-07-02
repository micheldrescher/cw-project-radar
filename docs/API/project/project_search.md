[back](../api.md)

# Search for projects using ful-text search

Fetch the names of projects that match the given set of full-text search terms. 

## Request

* URL: `/api/v1/project/search`
* Method: `POST`
* URL Params: `n/a`
* Body Params:
    1. `case` - Boolean - If true, the search will be case sensitive, otherwise case will be ignored.
    1. `terms` - [String] - String of whitespace separated search terms. Prefix a search term with '-' to return resilts that *do not* contain this term.
* Body:
```json
{
    "case": false,
    "terms": "IOT -Blockchain"
}
```

## Response

* Status code: `200 OK`
* Body Params:
    1. `status` - the status of the response in JSEND format, in this case `success`
    1. `results` - The number of projects that match the search terms
    1. `data` - [Object] - Array of search result objects
        1. `name` - String - the name of the project
        1. `cw_id` - Number - The Cyberwatching ID for this project
        1. `rcn` - Number - The unique RCN number for the project as assigned by the EU.
        1. `title` - String - the full project title.
* Body: 
```json
{
    "status": "success",
    "results": 18,
    "data": [
        {
            "name": "CE-IoT",
            "cw_id": 169,
            "rcn": 212980,
            "title": "A Framework for Pairing Circular Economy and IoT: IoT as an enabler of the Circular Economy circularity-by-design as an enabler for IoT (CE-IoT)",
            "id": null
        },
        {
            "name": "CREATE-IoT",
            "cw_id": 187,
            "rcn": 206371,
            "title": "CROSS FERTILISATION THROUGH ALIGNMENT, SYNCHRONISATION AND EXCHANGES FOR IoT",
            "id": null
        },
        ...
    ]
 }
```

[back](../api.md)
