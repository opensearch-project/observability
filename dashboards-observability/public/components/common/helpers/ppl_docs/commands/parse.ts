/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

export const parseCmd = `## parse 
---
### Description

The \`parse\` command parses a text field using a regular expression and append
the result to the search result.

### Syntax

parse &lt;field&gt; &lt;regular-expression&gt;

- field: mandatory. The field must be a text field.
- regular-expression: mandatory. The regular expression used to extract new
fields from given text field. If a new field name already exists, it will
replace the original field.

### Regular Expression

The regular expression is used to match the whole text field of each document
with Java regex engine. Each named capture group in the expression will become
a new \`STRING\` field.

### Example 1: Create the new field

The example shows how to create new field \`host\` for each document. \`host\`
will be the host name after \`@\` in \`email\` field. Parsing a null field will
return an empty string.

PPL query:

    os> source=accounts | parse email '.+@(?<host>.+)' | fields email, host ;
    fetched rows / total rows = 4/4
    +-----------------------+------------+
    | email                 | host       |
    |-----------------------+------------|
    | amberduke@pyrami.com  | pyrami.com |
    | hattiebond@netagy.com | netagy.com |
    | null                  |            |
    | daleadams@boink.com   | boink.com  |
    +-----------------------+------------+

### Example 2: Override the existing field

The example shows how to override the existing \`address\` field with street
number removed.

PPL query:

    os> source=accounts | parse address '\\d+ (?<address>.+)' | fields address ;
    fetched rows / total rows = 4/4
    +------------------+
    | address          |
    |------------------|
    | Holmes Lane      |
    | Bristol Street   |
    | Madison Street   |
    | Hutchinson Court |
    +------------------+

### Example 3: Filter and sort by casted parsed field

The example shows how to sort street numbers that are higher than 500 in
\`address\` field.

PPL query:

    os> source=accounts | parse address '(?<streetNumber>\d+) (?<street>.+)' | where cast(streetNumber as int) > 500 | sort num(streetNumber) | fields streetNumber, street ;
    fetched rows / total rows = 3/3
    +----------------+----------------+
    | streetNumber   | street         |
    |----------------+----------------|
    | 671            | Bristol Street |
    | 789            | Madison Street |
    | 880            | Holmes Lane    |
    +----------------+----------------+

### Limitation

There are a few limitations with parse command:

- Fields defined by parse cannot be parsed again.

  The following command will not work:

      source=accounts | parse address '\\d+ (?<street>.+)' | parse street '\\w+ (?<road>\\w+)' ;

- Fields defined by parse cannot be overridden with other commands.

  \`where\` will not match any documents since \`street\` cannot be overridden:

      source=accounts | parse address '\\d+ (?<street>.+)' | eval street='1' | where street='1' ;

- The text field used by parse cannot be overridden.

  \`street\` will not be successfully parsed since \`address\` is overridden:

      source=accounts | parse address '\\d+ (?<street>.+)' | eval address='1' ;

- Fields defined by parse cannot be filtered/sorted after using them in
\`stats\` command.

  \`where\` in the following command will not work:

      source=accounts | parse email '.+@(?<host>.+)' | stats avg(age) by host | where host=pyrami.com ;
`;
