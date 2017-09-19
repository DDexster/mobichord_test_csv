# MobiChord test task

## Table of Contents
- [Assignment](#assignment)
- [Installation and running](#install_and_run)

## Assignment

Create application on Node.js to parse and transform archived CSV files into a single file in JSON format. Use any external library until it works on any Platform (Unix, Win).

Input:

* zip archive with 2 CSV files

Output:

* JSON file

Result file should have the following structure:

```
{
"name": "string",
"phone": "string",
"person": {
    "firstName": {
        "type": "string"
    },
    "lastName": {
        "type": "string"
    },
},
"amount": "number",
"date": "date",
"costCenterNum": "string"
}
```

where:

* name - <last_name> + <first_name>
* phone - normalized <phone> (numbers only)
* date - <date> in YYYY-MM-DD format
* costCenterNum - <cc> without prefix (i.e. ACN00006 00006)

