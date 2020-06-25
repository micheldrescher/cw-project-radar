[back](../api.md)

# Radar

## Description

A Radar captures a snapshot in time of project maturity in technology and go-to-market activities.
Collecting projects that are classified in one of the second-tier taxonomy terms are collected, and then organised in a six-segment radar visualisation based on their classification and progress in their project lifetime. MTRL scores are used to visualise a spectrum of relative progress within each segment's ring arcs.

## Data model

### REQUIRED fields

Field      | Data type | Properties | Description
-----------|-----------|------------|-------------
`year`     | Number    | required   | The year for which the radar was published. Must be 2018 or greater.
`relese`   | enum      | required   | There are two radar visualisaitons published in each year, in `Spring` and `Autumn`. 
`slug`     | String    | read-only  | The slug is a machine-readable name composed using the year and release of a radar.
`name`     | String    | read-only  | The name of a radar. Composed of year and release.

### OTIONAL fields

Field             | Data type | Properties | Description
------------------|-----------|------------|-------------
`summary`         | String    |            | A human readable sumamry of the radar, usually written after all data is colelcted and visualised, but before publication.
`status`          | enum      | read-only  | A Radar is a tightly managed entity and has a lifecycle progressing through `created`, `populated`, `rendered`, `published` and `archived`.
`referenceDate`   | Date      |            | The reference date for the radar used to determine which projects are included, as well as to determie the project's progress through its lifecycle. When creating a radar, the default is the current day, but can be set using the corresponding REST API calls.
`publicationDate` | Date      |            | The date on which the radar was published (may be different from the reference date). Defaults to the current date.
`data`            | ObjectID  | read-only  | Set when a radar is populated. Collects all the necessary project related data required for visualisation.
`rendering`       | ObjectID  | read-only  | Holds the visualisation data comprising of tabulation of projects for overview purposes, as well as the actual graphical rendering of the radar as an SVG.

[back](../api.md)