# rule validation
This is a simple rule validation API

Author: Ogunmefun Anjolaoluwa

**Environments**
Node version - v14.15.0

NPM version - v6.14.10

**Install all dependencies**
```
npm install
```
**Start the application**
```
npm run start
```

**Run all tests**
```
npm run test
```

1) The first endpoint is a GET method-
**Endpoint**
``
/
``
- Gets a list of personal information
``
    name,
    github,
    email,
    mobile
``


Response format

application/json

2) The second endpoint is a POST method-
**Endpoint**
``
/validate-rule
``
This endpoint takes the data and rule payload and returns a json object of success or error

Instance of failed request
``
 "message": "field missions failed validation.",
    "status": "error",
    "data": {
        "validation": {
            "error": false,
            "field": "missions",
            "condition": "eq",
            "condition_value": 30
        }
    }

``

Instance of successful request
``
 "message": "field missions successfully validated."
  "status": "success",
  "data": {
    "validation": {
      "error": false,
      "field": "missions",
      "field_value": 30,
      "condition": "gte",
      "condition_value: 30
    }
  }
``
