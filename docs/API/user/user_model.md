[back](../api.md)

# User

## Description

A User is a simplified model of end users accessing the Project Radar using a browser, or programmatic agents accessing it using the REST API directly (the web browser interface uses the same API in the background).

## Data model

### REQUIRED fields

Field      | Data type | Properties | Description
-----------|-----------|------------|-------------
`name`     | String    | unique     | A user must have a name.
`email`    | String    | unique     | The email address associated with this User. Must be a syntactically valid email address.
`role`     | enum      |            | The role this user has in the system. Must be either `admin`, `manager`, or `project`. (Project value not used at the moment.) The default value is `project`.
`password` | String    |            | The encrypted password of the user.
`active`   | Boolean   |            | Currently not used.

### OPTIONAL fields

No optional fields in User.

[back](../api.md)