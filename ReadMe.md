# MobiChord test task

## Table of Contents
- [Assignment](#assignment)
- [Installation and running](#install-and-run)

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

## Install and Run

1. Clone git repository or download ZIP archive
```
git clone https://github.com/DDexster/mobichord_test_csv.git
```

2. In your application directory install node_modules, required in **package.json**, using *npm* or *yarn*:
    
```
npm install
```

3. After *npm* or *yarn* ends installation put your zip archive, that contains **.csv** files into `/input` folder.

4. In you command line type:

```
node app.js
```
5. If parsing successiful you wil see this kind og message in your command line:

```
{path}/{filename}.json written Successifully!
```