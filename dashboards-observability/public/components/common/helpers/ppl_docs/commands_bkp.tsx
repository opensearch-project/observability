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

export const dedupCmd = `## dedup
---

### Description

Using \'dedup\' command to remove identical document defined by field from
the search result.

### Syntax

dedup \[int\] &lt;field-list&gt; \[keepempty=&lt;bool&gt;\]
\[consecutive=&lt;bool&gt;\]

-   int: optional. The \'dedup\' command retains multiple events for each
    combination when you specify &lt;int&gt;. The number for &lt;int&gt;
    must be greater than 0. If you do not specify a number, only the
    first occurring event is kept. All other duplicates are removed from
    the results. **Default:** 1
-   keepempty: optional. if true, keep the document if the any field in
    the field-list has NULL value or field is MISSING. **Default:**
    false.
-   consecutive: optional. If set to true, removes only events with
    duplicate combinations of values that are consecutive. **Default:**
    false.
-   field-list: mandatory. The comma-delimited field list. At least one
    field is required.

### Example 1: Dedup by one field

The example show dedup the document with gender field.

PPL query:

    os> source=accounts | dedup gender | fields account_number, gender;
    fetched rows / total rows = 2/2
    +------------------+----------+
    | account_number   | gender   |
    |------------------+----------|
    | 1                | M        |
    | 13               | F        |
    +------------------+----------+

### Example 2: Keep 2 duplicates documents

The example show dedup the document with gender field keep 2
duplication.

PPL query:

    os> source=accounts | dedup 2 gender | fields account_number, gender;
    fetched rows / total rows = 3/3
    +------------------+----------+
    | account_number   | gender   |
    |------------------+----------|
    | 1                | M        |
    | 6                | M        |
    | 13               | F        |
    +------------------+----------+

### Example 3: Keep or Ignore the empty field by default

The example show dedup the document by keep null value field.

PPL query:

    os> source=accounts | dedup email keepempty=true | fields account_number, email;
    fetched rows / total rows = 4/4
    +------------------+-----------------------+
    | account_number   | email                 |
    |------------------+-----------------------|
    | 1                | amberduke@pyrami.com  |
    | 6                | hattiebond@netagy.com |
    | 13               | null                  |
    | 18               | daleadams@boink.com   |
    +------------------+-----------------------+

The example show dedup the document by ignore the empty value field.

PPL query:

    os> source=accounts | dedup email | fields account_number, email;
    fetched rows / total rows = 3/3
    +------------------+-----------------------+
    | account_number   | email                 |
    |------------------+-----------------------|
    | 1                | amberduke@pyrami.com  |
    | 6                | hattiebond@netagy.com |
    | 18               | daleadams@boink.com   |
    +------------------+-----------------------+

#### Example 4: Dedup in consecutive document

The example show dedup the consecutive document.

PPL query:

    os> source=accounts | dedup gender consecutive=true | fields account_number, gender;
    fetched rows / total rows = 3/3
    +------------------+----------+
    | account_number   | gender   |
    |------------------+----------|
    | 1                | M        |
    | 13               | F        |
    | 18               | M        |
    +------------------+----------+
`;

export const evalCmd = `## eval
---

### Description

The \'eval\' command evaluate the expression and append the result to the
search result.

### Syntax

eval &lt;field&gt;=&lt;expression&gt; \[","
&lt;field&gt;=&lt;expression&gt; \]...

-   field: mandatory. If the field name not exist, a new field is added.
    If the field name already exists, it will be overrided.
-   expression: mandatory. Any expression support by the system.

### Example 1: Create the new field

The example show to create new field doubleAge for each document. The
new doubleAge is the evaluation result of age multiply by 2.

PPL query:

    os> source=accounts | eval doubleAge = age * 2 | fields age, doubleAge ;
    fetched rows / total rows = 4/4
    +-------+-------------+
    | age   | doubleAge   |
    |-------+-------------|
    | 32    | 64          |
    | 36    | 72          |
    | 28    | 56          |
    | 33    | 66          |
    +-------+-------------+

### Example 2: Override the existing field

The example show to override the exist age field with age plus 1.

PPL query:

    os> source=accounts | eval age = age + 1 | fields age ;
    fetched rows / total rows = 4/4
    +-------+
    | age   |
    |-------|
    | 33    |
    | 37    |
    | 29    |
    | 34    |
    +-------+

### Example 3: Create the new field with field defined in eval

The example show to create a new field ddAge with field defined in eval
command. The new field ddAge is the evaluation result of doubleAge
multiply by 2, the doubleAge is defined in the eval command.

PPL query:

    os> source=accounts | eval doubleAge = age * 2, ddAge = doubleAge * 2 | fields age, doubleAge, ddAge ;
    fetched rows / total rows = 4/4
    +-------+-------------+---------+
    | age   | doubleAge   | ddAge   |
    |-------+-------------+---------|
    | 32    | 64          | 128     |
    | 36    | 72          | 144     |
    | 28    | 56          | 112     |
    | 33    | 66          | 132     |
    +-------+-------------+---------+
`;

export const fieldsCmd = `## fields
---
### Description

Using \`fields\` command to keep or remove fields from the search result.

### Syntax

field \[+\|-\] &lt;field-list&gt;

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

export const headCmd = `## head
---

### Description

The \`head\` command returns the first N number of specified results in
search order.

### Syntax

head \[N\]

-   N: optional. number of results to return. **Default:** 10

### Example 1: Get first 10 results

The example show first 10 results from accounts index.

PPL query:

    os> source=accounts | fields firstname, age | head;
    fetched rows / total rows = 10/10
    +---------------+-----------+
    | firstname     | age       |
    |---------------+-----------|
    | Amber         | 32        |
    | Hattie        | 36        |
    | Nanette       | 28        |
    | Dale          | 33        |
    | Elinor        | 36        |
    | Virginia      | 39        |
    | Dillard       | 34        |
    | Mcgee         | 39        |
    | Aurelia       | 37        |
    | Fulton        | 23        |
    +---------------+-----------+

### Example 2: Get first N results

The example show first N results from accounts index.

PPL query:

    os> source=accounts | fields firstname, age | head 3;
    fetched rows / total rows = 3/3
    +---------------+-----------+
    | firstname     | age       |
    |---------------+-----------|
    | Amber         | 32        |
    | Hattie        | 36        |
    | Nanette       | 28        |
    +---------------+-----------+
`;

export const rareCmd = `## rare
---

### Description

Using \`rare\` command to find the least common tuple of values of all
fields in the field list.

**Note**: A maximum of 10 results is returned for each distinct tuple of
values of the group-by fields.

### Syntax

rare &lt;field-list&gt; \[by-clause\]

-   field-list: mandatory. comma-delimited list of field names.
-   by-clause: optional. one or more fields to group the results by.

### Example 1: Find the least common values in a field

The example finds least common gender of all the accounts.

PPL query:

    os> source=accounts | rare gender;
    fetched rows / total rows = 2/2
    +------------+
    | gender     |
    |------------|
    | F          |
    |------------|
    | M          |
    +------------+

### Example 2: Find the least common values organized by gender

The example finds least common age of all the accounts group by gender.

PPL query:

    os> source=accounts | rare age by gender;
    fetched rows / total rows = 20/20
    +----------+----------+
    | gender   | age      |
    |----------+----------|
    | F        | 29       |
    | F        | 20       |
    | F        | 23       |
    | F        | 25       |
    | F        | 37       |
    | F        | 38       |
    | F        | 40       |
    | F        | 27       |
    | F        | 36       |
    | F        | 24       |
    | M        | 27       |
    | M        | 24       |
    | M        | 34       |
    | M        | 38       |
    | M        | 28       |
    | M        | 39       |
    | M        | 21       |
    | M        | 30       |
    | M        | 25       |
    | M        | 29       |
    +----------+----------+
`;

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

export const searchCmd = `## search 
---

### Description

Using \`search\` command to retrieve document from the index. \`search\`
command could be only used as the first command in the PPL query.

### Syntax

search source=&lt;index&gt; \[boolean-expression\]

-   search: search keywords, which could be ignore.
-   index: mandatory. search command must specify which index to query
    from.
-   bool-expression: optional. any expression which could be evaluated
    to boolean value.

### Example 1: Fetch all the data

The example show fetch all the document from accounts index.

PPL query:

    os> source=accounts;
    fetched rows / total rows = 4/4
    +----------------+-----------+----------------------+---------+--------+--------+----------+-------+-----+-----------------------+----------+
    | account_number | firstname | address              | balance | gender | city   | employer | state | age | email                 | lastname |
    +----------------+-----------+----------------------+---------+--------+--------+----------+-------+-----+-----------------------+----------+
    | 1              | Amber     | 880 Holmes Lane      | 39225   | M      | Brogan | Pyrami   | IL    | 32  | amberduke@pyrami.com  | Duke     |
    | 6              | Hattie    | 671 Bristol Street   | 5686    | M      | Dante  | Netagy   | TN    | 36  | hattiebond@netagy.com | Bond     |
    | 13             | Nanette   | 789 Madison Street   | 32838   | F      | Nogal  | Quility  | VA    | 28  | null                  | Bates    |
    | 18             | Dale      | 467 Hutchinson Court | 4180    | M      | Orick  | null     | MD    | 33  | daleadams@boink.com   | Adams    |
    +----------------+-----------+----------------------+---------+--------+--------+----------+-------+-----+-----------------------+----------+

### Example 2: Fetch data with condition

The example show fetch all the document from accounts index with .

PPL query:

    os> source=accounts account_number=1 or gender="F";
    fetched rows / total rows = 2/2
    +------------------+-------------+--------------------+-----------+----------+--------+------------+---------+-------+----------------------+------------+
    | account_number   | firstname   | address            | balance   | gender   | city   | employer   | state   | age   | email                | lastname   |
    |------------------+-------------+--------------------+-----------+----------+--------+------------+---------+-------+----------------------+------------|
    | 1                | Amber       | 880 Holmes Lane    | 39225     | M        | Brogan | Pyrami     | IL      | 32    | amberduke@pyrami.com | Duke       |
    | 13               | Nanette     | 789 Madison Street | 32838     | F        | Nogal  | Quility    | VA      | 28    | null                 | Bates      |
    +------------------+-------------+--------------------+-----------+----------+--------+------------+---------+-------+----------------------+------------+
`;

export const sortCmd = `## sort 
---
### Description

Using \`sort\` command to sorts all the search result by the specified
fields.

### Syntax

sort &lt;\[+\|-\] sort-field&gt;...

-   \[+\|-\]: optional. The plus \[+\] stands for ascending order and
    NULL/MISSING first and a minus \[-\] stands for descending order and
    NULL/MISSING last. **Default:** ascending order and NULL/MISSING
    first.
-   sort-field: mandatory. The field used to sort.

### Example 1: Sort by one field

The example show sort all the document with age field in ascending
order.

PPL query:

    os> source=accounts | sort age | fields account_number, age;
    fetched rows / total rows = 4/4
    +------------------+-------+
    | account_number   | age   |
    |------------------+-------|
    | 13               | 28    |
    | 1                | 32    |
    | 18               | 33    |
    | 6                | 36    |
    +------------------+-------+

### Example 2: Sort by one field return all the result

The example show sort all the document with age field in ascending
order.

PPL query:

    os> source=accounts | sort age | fields account_number, age;
    fetched rows / total rows = 4/4
    +------------------+-------+
    | account_number   | age   |
    |------------------+-------|
    | 13               | 28    |
    | 1                | 32    |
    | 18               | 33    |
    | 6                | 36    |
    +------------------+-------+

### Example 3: Sort by one field in descending order

The example show sort all the document with age field in descending
order.

PPL query:

    os> source=accounts | sort - age | fields account_number, age;
    fetched rows / total rows = 4/4
    +------------------+-------+
    | account_number   | age   |
    |------------------+-------|
    | 6                | 36    |
    | 18               | 33    |
    | 1                | 32    |
    | 13               | 28    |
    +------------------+-------+

### Example 4: Sort by multiple field 

The example show sort all the document with gender field in ascending
order and age field in descending.

PPL query:

    os> source=accounts | sort + gender, - age | fields account_number, gender, age;
    fetched rows / total rows = 4/4
    +------------------+----------+-------+
    | account_number   | gender   | age   |
    |------------------+----------+-------|
    | 13               | F        | 28    |
    | 6                | M        | 36    |
    | 18               | M        | 33    |
    | 1                | M        | 32    |
    +------------------+----------+-------+

### Example 5: Sort by field include null value

The example show sort employer field by default option (ascending order
and null first), the result show that null value is in the first row.

PPL query:

    os> source=accounts | sort employer | fields employer;
    fetched rows / total rows = 4/4
    +------------+
    | employer   |
    |------------|
    | null       |
    | Netagy     |
    | Pyrami     |
    | Quility    |
    +------------+
`;

export const statsCmd = `## stats
---

### Description

Using \`stats\` command to calculate the aggregation from search result.

The following table catalogs the aggregation functions and also
indicates how the NULL/MISSING values is handled:

|          |             |             |
|----------|-------------|-------------|
| Function | NULL        | MISSING     |
| COUNT    | Not counted | Not counted |
| SUM      | Ignore      | Ignore      |
| AVG      | Ignore      | Ignore      |
| MAX      | Ignore      | Ignore      |
| MIN      | Ignore      | Ignore      |

### Syntax

stats &lt;aggregation&gt;... \[by-clause\]...

-   aggregation: mandatory. A aggregation function. The argument of
    aggregation must be field.
-   by-clause: optional. The one or more fields to group the results by.
    **Default**: If no &lt;by-clause&gt; is specified, the stats command
    returns only one row, which is the aggregation over the entire
    result set.

### **Aggregation Functions**
---
### **COUNT**

Description

Usage: Returns a count of the number of expr in the rows retrieved by a
SELECT statement.

Example:

    os> source=accounts | stats count();
    fetched rows / total rows = 1/1
    +-----------+
    | count()   |
    |-----------|
    | 4         |
    +-----------+

### **SUM**

Description

Usage: SUM(expr). Returns the sum of expr.

Example:

    os> source=accounts | stats sum(age) by gender;
    fetched rows / total rows = 2/2
    +------------+----------+
    | sum(age)   | gender   |
    |------------+----------|
    | 28         | F        |
    | 101        | M        |
    +------------+----------+

### **AVG**

Description

Usage: AVG(expr). Returns the average value of expr.

Example:

    os> source=accounts | stats avg(age) by gender;
    fetched rows / total rows = 2/2
    +--------------------+----------+
    | avg(age)           | gender   |
    |--------------------+----------|
    | 28.0               | F        |
    | 33.666666666666664 | M        |
    +--------------------+----------+

### **MAX**

Description

Usage: MAX(expr). Returns the maximum value of expr.

Example:

    os> source=accounts | stats max(age);
    fetched rows / total rows = 1/1
    +------------+
    | max(age)   |
    |------------|
    | 36         |
    +------------+

### **MIN**

Description

Usage: MIN(expr). Returns the minimum value of expr.

Example:

    os> source=accounts | stats min(age);
    fetched rows / total rows = 1/1
    +------------+
    | min(age)   |
    |------------|
    | 28         |
    +------------+

### **VAR\_SAMP**

Description

Usage: VAR\_SAMP(expr). Returns the sample variance of expr.

Example:

    os> source=accounts | stats var_samp(age);
    fetched rows / total rows = 1/1
    +--------------------+
    | var_samp(age)      |
    |--------------------|
    | 10.916666666666666 |
    +--------------------+

### **VAR\_POP**

Description

Usage: VAR\_POP(expr). Returns the population standard variance of expr.

Example:

    os> source=accounts | stats var_pop(age);
    fetched rows / total rows = 1/1
    +----------------+
    | var_pop(age)   |
    |----------------|
    | 8.1875         |
    +----------------+

### **STDDEV\_SAMP**

Description

Usage: STDDEV\_SAMP(expr). Return the sample standard deviation of expr.

Example:

    os> source=accounts | stats stddev_samp(age);
    fetched rows / total rows = 1/1
    +--------------------+
    | stddev_samp(age)   |
    |--------------------|
    | 3.304037933599835  |
    +--------------------+

### **STDDEV\_POP**

Description

Usage: STDDEV\_POP(expr). Return the population standard deviation of
expr.

Example:

    os> source=accounts | stats stddev_pop(age);
    fetched rows / total rows = 1/1
    +--------------------+
    | stddev_pop(age)    |
    |--------------------|
    | 2.8613807855648994 |
    +--------------------+

### **By Clause**

The by clause could be the fields and expressions like scalar functions
and aggregation functions. Besides, the span clause can also be used in
the by clause to split specific field into buckets in the same interval,
the stats then does the aggregation by these span buckets.

The span syntax is \`span(field_expr, interval_expr)\`, the unit of the
interval expression is the natural unit by default. If the field is a
date and time type field, and the interval is in date/time units, you
will need to specify the unit in the interval expression. For example,
to split the field \`age\` into buckets by 10 years, it looks like
\`span(age, 10)\`. And here is another example of time span, the span to
split a \`timestamp\` field into hourly intervals, it looks like
\`span(timestamp, 1h)\`.

Available time unit:

| Span Interval Units        |
|----------------------------|
| millisecond (ms)           |
| second (s)                 |
| minute (m, case sensitive) |
| hour (h)                   |
| day (d)                    |
| week (w)                   |
| month (M, case sensitive)  |
| quarter (q)                |
| year (y)                   |

### Example 1: Calculate the count of events

The example show calculate the count of events in the accounts.

PPL query:

    os> source=accounts | stats count();
    fetched rows / total rows = 1/1
    +-----------+
    | count()   |
    |-----------|
    | 4         |
    +-----------+

### Example 2: Calculate the average of a field

The example show calculate the average age of all the accounts.

PPL query:

    os> source=accounts | stats avg(age);
    fetched rows / total rows = 1/1
    +------------+
    | avg(age)   |
    |------------|
    | 32.25      |
    +------------+

### Example 3: Calculate the average of a field by group

The example show calculate the average age of all the accounts group by
gender.

PPL query:

    os> source=accounts | stats avg(age) by gender;
    fetched rows / total rows = 2/2
    +--------------------+----------+
    | avg(age)           | gender   |
    |--------------------+----------|
    | 28.0               | F        |
    | 33.666666666666664 | M        |
    +--------------------+----------+

### Example 4: Calculate the average, sum and count of a field by group

The example show calculate the average age, sum age and count of events
of all the accounts group by gender.

PPL query:

    os> source=accounts | stats avg(age), sum(age), count() by gender;
    fetched rows / total rows = 2/2
    +--------------------+------------+-----------+----------+
    | avg(age)           | sum(age)   | count()   | gender   |
    |--------------------+------------+-----------+----------|
    | 28.0               | 28         | 1         | F        |
    | 33.666666666666664 | 101        | 3         | M        |
    +--------------------+------------+-----------+----------+

### Example 5: Calculate the maximum of a field

The example calculates the max age of all the accounts.

PPL query:

    os> source=accounts | stats max(age);
    fetched rows / total rows = 1/1
    +------------+
    | max(age)   |
    |------------|
    | 36         |
    +------------+

### Example 6: Calculate the maximum and minimum of a field by group

The example calculates the max and min age values of all the accounts
group by gender.

PPL query:

    os> source=accounts | stats max(age), min(age) by gender;
    fetched rows / total rows = 2/2
    +------------+------------+----------+
    | max(age)   | min(age)   | gender   |
    |------------+------------+----------|
    | 28         | 28         | F        |
    | 36         | 32         | M        |
    +------------+------------+----------+

### Example 7: Calculate the distinct count of a field

To get the count of distinct values of a field, you can use
\`DISTINCT_COUNT\` (or \`DC\`) function instead of \`COUNT\`. The example
calculates both the count and the distinct count of gender field of all
the accounts.

PPL query:

    os> source=accounts | stats count(gender), distinct_count(gender);
    fetched rows / total rows = 1/1
    +-----------------+--------------------------+
    | count(gender)   | distinct_count(gender)   |
    |-----------------+--------------------------|
    | 4               | 2                        |
    +-----------------+--------------------------+

### Example 8: Calculate the count by a span

The example gets the count of age by the interval of 10 years.

PPL query:

    os> source=accounts | stats count(age) by span(age, 10) as age_span
    fetched rows / total rows = 2/2
    +--------------+------------+
    | count(age)   | age_span   |
    |--------------+------------|
    | 1            | 20         |
    | 3            | 30         |
    +--------------+------------+
`;

export const topCmd = `## top
---
### Description

Using \`top\` command to find the most common tuple of values of all
fields in the field list.

### Syntax

top \[N\] &lt;field-list&gt; \[by-clause\]

-   N: number of results to return. **Default**: 10
-   field-list: mandatory. comma-delimited list of field names.
-   by-clause: optional. one or more fields to group the results by.

### Example 1: Find the most common values in a field

The example finds most common gender of all the accounts.

PPL query:

    os> source=accounts | top gender;
    fetched rows / total rows = 2/2
    +------------+
    | gender     |
    |------------|
    | M          |
    |------------|
    | F          |
    +------------+

### Example 2: Find the most common values in a field

The example finds most common gender of all the accounts.

PPL query:

    os> source=accounts | top 1 gender;
    fetched rows / total rows = 1/1
    +------------+
    | gender     |
    |------------|
    | M          |
    +------------+

### Example 3: Find the most common values organized by gender

The example finds most common age of all the accounts group by gender.

PPL query:

    os> source=accounts | top 1 age by gender;
    fetched rows / total rows = 2/2
    +----------+----------+
    | gender   | age      |
    |----------+----------|
    | F        | 39       |
    | M        | 31       |
    +----------+----------+
`;

export const wherecmd = `## where
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
