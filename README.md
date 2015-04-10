## Beanstalk API wrapper

> Node JS / IO JS wrapper for the Beanstalk API

### Example - fetching a single file from a tagged release
 
```js
var org  = require("beanstalk-api/org");
var file = require("beanstalk-api/file");

/**
 * Create a Client
 */
 
var client = org({
    org: "your-subdmain",
    username: "some-user",
    token: "your-api-token",
});

/**
 * Get a SINGLE file's contents from a specific tag
 */ 
 
file({
    client: client,
    path: "./public/Gruntfile.js",
    revision: "1.0.0"
})
.then(function(file) {
    console.log(file.contents);
})
.catch(function(err) {
    console.error(err);
});

```

