[rcon.js](README.md) › [Globals](globals.md)

# rcon.js

# RCON.js
An RCON client for NodeJS developers. 

## Example Usage
```javascript
const {Client} = require('rcon.js');
const client = new Client('127.0.0.1', 25575);

client.login('password')
    .then(async () => {
        const response = await client.command('seed');
        console.log(response.body);
    });
```

## Further Documentation
Refer to [docs](./docs/globals.md)
