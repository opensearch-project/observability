/*
* SPDX-License-Identifier: Apache-2.0
*
* The OpenSearch Contributors require contributions made to
* this file be licensed under the Apache-2.0 license or a
* compatible open source license.
*
* Modifications Copyright OpenSearch Contributors. See
* GitHub history for details.
*/

export const fieldsCmd = `## fields
---
### Description

Using \`fields\` command to keep or remove fields from the search result.

### Syntax

fields \[+\|-\] &lt;field-list&gt;

-   index: optional. if the plus (+) is used, only the fields specified
    in the field list will be keep. if the minus (-) is used, all the
    fields specified in the field list will be removed. **Default** +
-   field list: mandatory. comma-delimited keep or remove fields.

### Example 1: Select specified fields from result

The example show fetch account\_number, firstname and lastname fields
from search results.

PPL query:

    os> source=accounts | fields account_number, firstname, lastname;
    fetched rows / total rows = 4/4
    +------------------+-------------+------------+
    | account_number   | firstname   | lastname   |
    |------------------+-------------+------------|
    | 1                | Amber       | Duke       |
    | 6                | Hattie      | Bond       |
    | 13               | Nanette     | Bates      |
    | 18               | Dale        | Adams      |
    +------------------+-------------+------------+

### Example 2: Remove specified fields from result

The example show fetch remove account\_number field from search results.

PPL query:

    os> source=accounts | fields account_number, firstname, lastname | fields - account_number ;
    fetched rows / total rows = 4/4
    +-------------+------------+
    | firstname   | lastname   |
    |-------------+------------|
    | Amber       | Duke       |
    | Hattie      | Bond       |
    | Nanette     | Bates      |
    | Dale        | Adams      |
    +-------------+------------+
`;