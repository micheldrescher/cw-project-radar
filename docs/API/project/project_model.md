[back](../api.md)

# Project

## Description

Project encapsulates information about an EC-funded project (in the cybersecurity research arena).

Apart from the standard static and base data that is expected to rarely if ever change, the following Project-related data is collected to make up the radars:

 * Classifications - A first level partitioning of projects (see below for details)
 * MTRL Scores - A pair of numerical values representing a project's technical and market readiness on a scale from 0 to 9. (see below)

### REQUIRED fields

Field                | Data type | Properties | Description
---------------------|-----------|------------|-------------
`cw_id`              | Number    | read-only  | The Cyberwatching.eu-specific project id. Generated when a project is created using the REST API.
`name`               | String    |            | The project name, e.g. "Cyberwatching.eu"
`rcn`                | Number    | unique     | The RCN is a number assigned by the EC to the project as an EC-unique number. It is required to uniquely identify a project, as there may be instances of projects with the same name across DGs and units, and across funding calls.
`title`              | String    | unique     | The full title of the project, e.g. "A European cybersecurity and privacy observatory"
`teaser`             | String    |            | A short teaser text extracted from the project abstract. Can be found on CORDIS in machine-readable format.
`startDate`          | Date      |            | The start date of the project.
`endDate`            | Date      |            | The end date of the project.

### OTIONAL fields

Field                | Data type | Properties | Description
---------------------|-----------|------------|-------------
`hasClassifications` | Boolean   | read-only  | A technical flag that is set by REST API calls to indicate that a project has been classified against the Cyberwatching.ey taxonomy and is therefore eligible for inclusion in radar publications.
`hasScores`          | Boolean   | read-only  | A technical flag that is set by REST API calls indicating that at least one MTRL score nas been submitted for this project.
`call`               | String    |            | The funding call for this project
`type`               | String    |            | THe type of project in EC funding terms. Often and frequently one of 'RIA', 'IA', 'CSA' but can be anything as per funding call.
`totalCost`          | Number    |            | A decimal number indicating the project's total budget in EUR.
`url`                | String    |            | A link pointing to the projects web presence. Must be a valid URL.
`fundingBodyLink`    | String    |            | A link to the funding body's project summary. Usually pointing to CORDIS. Must be a valid URL.
`cwurl`              | String    |            | A URL pointing to the project's Cuberwatching.eu ProjectHUB's presence. Must be a valid URL.
`tags`               | [String]  |            | An array of Strings representing JRC cybersecurity taxonomy tags.

[back](../api.md)

# Classification

## Description

Projects that indeed do research and innovation in the EU cybersecurity and privacy (CS & P) arena are classified against Cyberwatching.eu's CS & P taxonomy. 

A project may be re-classified, therefore bearing a trail of classifications. Only the latest classification is used when creating a radar instance. Consequently, over time, there is a chance a project might appear in different segments in different radars (though at the time of writing this never happened).

### REQUIRED fields

Field            | Data type | Properties | Description
-----------------|-----------|------------|-------------
`project`        | ObjectID  | read-only  | The project this classification belongs to.
`classification` | enum      |            | The classification. Must be one of 'Secure Systems', 'Verification & Assurance', 'Operational Risk', 'Identity & Privacy', 'Cybersecurity Governance', 'Human Aspects'
`classifiedOn`   | Date      |            | The date the project was (re-)classified. Defaults to the current date.
`classifiedBy`   | enum      |            | Who classified the project? Either 'Cyberwatching' or 'Project'. Defaults to 'Cuberwatching'.

### OPTIONAL fields

Field            | Data type | Properties | Description
-----------------|-----------|------------|-------------
`changeSummary`  | String    |            | What is the reason for this (re-)classification? Used to delineate why a project was reclassified, not for rationaling about why or how the current classification wash determined.

[back](../api.md)

# MTRL Score

## Description

Projects are regularly asked to self-assess their technical and market maturity. Technical and market readines levels (TRL and MRL) are captured as numerical values on a scale from 0 to 9.

It is expected that projects regularly submit MTRL scores to the project radar, creating a trail of assessments over their lifetime. When a radar is (re-)created, only the MTRL Score that at the radar's reference date was the most recent one is used to visualise the proejct in the radar.

### REQUIRED fields

Field            | Data type | Properties | Description
-----------------|-----------|------------|-------------
`project`        | ObjectID  | read-only  | The project this MTRL score belongs to.
`scoringDate`    | Date      |            | The date the score was determined. Defaults to the current date.
`mrl`            | Number    |            | The Market Readiness Level (MRL) score. A number between 0 and 9.
`trl`            | Number    |            | The Technology Readiness Level (TRL) score. A number between 0 and 9.
`score`          | Number    | read-only  | An overall score calculated using the MRL and TRL.

[back](../api.md)
