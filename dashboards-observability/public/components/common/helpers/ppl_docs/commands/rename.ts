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

export const renameCmd = `## rename
---
### Description

Using \`rename\` command to rename one or more fields in the search
result.

### Syntax

rename &lt;source-field&gt; AS &lt;target-field&gt;\[","
&lt;source-field&gt; AS &lt;target-field&gt;\]...

-   source-field: mandatory. The name of the field you want to rename.
-   field list: mandatory. The name you want to rename to.

### Example 1: Rename one field

The example show rename one field.

PPL query:

    os> source=accounts | rename account_number as an | fields an;
    fetched rows / total rows = 4/4
    +------+
    | an   |
    |------|
    | 1    |
    | 6    |
    | 13   |
    | 18   |
    +------+

### Example 2: Rename multiple fields

The example show rename multiple fields.

PPL query:

    os> source=accounts | rename account_number as an, employer as emp | fields an, emp;
    fetched rows / total rows = 4/4
    +------+---------+
    | an   | emp     |
    |------+---------|
    | 1    | Pyrami  |
    | 6    | Netagy  |
    | 13   | Quility |
    | 18   | null    |
    +------+---------+
`;