[back](../api.md)

# TITLE

*<Description of the endpoint's function>*

**Access level: authenticated | manager | admin**
*<Use this to indicate that the endpoint is protected with the given role. Delete if it is publicly accessible.>

## Request

* URL: `URL path of the endpoint (no host)`
* Method: `HTT METHOD`
* URL Params: `either n/a or a list of URL parameters like so`
    1. `name` - String - The name of the project
* Cookie: `jwt=...` *Use this if the endpoint is proteted. Delete if public.*
* Body Params: `either n/a or a numbered list of fields in the body of the HTTP request`
    1. `param1` - number - Description of the param
    1. `param2` - [String] - Array notation of fields.
    1. `param3` - {Object} - Declaration of an object. Use sub-lists to declare fields. If too complex, refer to further docs.
        1. `field1` - String - And so forth...
* Body: `either n/a or a JSON formatted request body`

```json
{
    "key1": "value",
    ...
}
```

## Response

* Status code: `HTTP status code`
* Body Params: `either n/a or a documentation of the body fields. Format is the same as for request bodies.
    1. `param1` - number - Description of the param
    1. `param2` - [String] - Array notation of fields.
    1. `param3` - {Object} - Declaration of an object. Use sub-lists to declare fields. If too complex, refer to further docs.
        1. `field1` - String - And so forth...
* Body: `either n/a or a JSON formatted request body`
```json
{
    "status": "success",
    "data": [13, 22, 154]
}
```

OR

*<Add as many alternative responses as required. The first one (above) should always be the success response. All following should be error responses. Delete if there are no alternative error responses.>*

For further AuthN & AuthZ related error responses see [here](auth_generic_messages.md). 

*<Delete if endpoint is public.>*

[back](../api.md)
