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

export const whereCmd = `## where
---

### Description

The \`where\` command bool-expression to filter the search result. The
\`where\` command only return the result when bool-expression evaluated to
true.

### Syntax

where &lt;boolean-expression&gt;

-   bool-expression: optional. any expression which could be evaluated
    to boolean value.

### Example 1: Filter result set with condition

The example show fetch all the document from accounts index with .

PPL query:

    os> source=accounts | where account_number=1 or gender="F" | fields account_number, gender;
    fetched rows / total rows = 2/2
    +------------------+----------+
    | account_number   | gender   |
    |------------------+----------|
    | 1                | M        |
    | 13               | F        |
    +------------------+----------+
`;
