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

export const overview = `## Overview
---
Piped Processing Language (PPL), powered by OpenSearch, enables
OpenSearch users with exploration and discovery of, and finding search
patterns in data stored in OpenSearch, using a set of commands delimited
by pipes (\|). These are essentially read-only requests to process data
and return results.

Currently, OpenSearch users can query data using either Query DSL or
SQL. Query DSL is powerful and fast. However, it has a steep learning
curve, and was not designed as a human interface to easily create ad hoc
queries and explore user data. SQL allows users to extract and analyze
data in OpenSearch in a declarative manner. OpenSearch now makes its
search and query engine robust by introducing Piped Processing Language
(PPL). It enables users to extract insights from OpenSearch with a
sequence of commands delimited by pipes () syntax. It enables
developers, DevOps engineers, support engineers, site reliability
engineers (SREs), and IT managers to effectively discover and explore
log, monitoring and observability data stored in OpenSearch.

We expand the capabilities of our Workbench, a comprehensive and
integrated visual query tool currently supporting only SQL, to run
on-demand PPL commands, and view and save results as text and JSON. We
also add a new interactive standalone command line tool, the PPL CLI, to
run on-demand PPL commands, and view and save results as text and JSON.

The query start with search command and then flowing a set of command
delimited by pipe ( for example, the following query retrieve firstname
and lastname from accounts if age large than 18.

\`\`\` 
source=accounts
| where age > 18
| fields firstname, lastname
\`\`\`
`;
