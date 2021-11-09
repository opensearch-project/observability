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

export const syntaxCmd = `## Syntax
---
### Command Order

The PPL query started with \`search\` command to reference a table search
from. All the following command could be in any order. In the following
example, \`search\` command refer the accounts index as the source, then
using fields and where command to do the further processing.

\`\`\` 
search source=accounts
| where age > 18
| fields firstname, lastname
\`\`\`

### Required arguments

Required arguments are shown in angle brackets \< \>.

### Optional arguments

Optional arguments are enclosed in square brackets \[ \].`;