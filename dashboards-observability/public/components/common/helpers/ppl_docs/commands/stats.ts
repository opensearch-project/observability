/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

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

**Description**

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

**Description**

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

**Description**

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

**Description**

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

**Description**

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

**Description**

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

**Description**

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

**Description**

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

**Description**

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