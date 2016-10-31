policify
========

[![npm version][npm-badge]][npm-url]
[![Build Status][travis-badge]][travis-url]

Bundle node dependencies and use them in Apigee Edge javascript policies. Built upon the excellent Browserify project.

## Install

```
npm install policify
```

## Usage

### Bundle up the module you need would like to use in Apigee Edge

#### Create a policify module

In the example below we use the z-schema module in a new module 'policify'. The policify modules will be used in Apigee.

```javascript
#./validate-schema.js
var ZSchema = require('z-schema');

ZSchema = new ZSchema({
  breakOnFirstError: true,
  noExtraKeywords: true,
  ignoreUnknownFormats: false,
  reportPathAsArray: true
});

var policify = {
  validateSchema: function (injected, schema) {
    return ZSchema.validate(injected, schema);
  }
};

module.exports = policify;
```

#### Bundle it up with policify

```
npm install policify uglify-js
policify ./validate-schema.js | uglifyjs > bundle.js
```

#### Add it to Apigee using a JS policify

```
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Javascript timeLimit="200" async="false" continueOnError="true" enabled="true" name="Add Output Validation">
  <DisplayName>Add Output Validation</DisplayName>
  <IncludeURL>jsc://bundle.js</IncludeURL>
  <ResourceURL>jsc://schema-validation.js</ResourceURL>
</Javascript>
```

#### Use it (schema-validation.js)

```
...
var bundle = context.getVariable('bundle');
bundle.policify.validateSchema(target, schema);
...
```


[npm-badge]: https://badge.fury.io/js/policify.svg
[npm-url]: https://badge.fury.io/js/policify

[travis-badge]: https://travis-ci.org/orangewise/policify.svg?branch=master
[travis-url]: https://travis-ci.org/orangewise/policify
