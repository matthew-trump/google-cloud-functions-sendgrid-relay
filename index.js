const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const cors = require('cors');
const secretKeyAuthorization = require('./secret-key-auth');

app.use(bodyParser.json());
app.use(cors({ origin: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', secretKeyAuthorization, require('./routes'));

app.listen(port)

module.exports = {
    app
};

console.log("LISTENING ON PORT", port);
console.log("EMAIL_DOMAIN", process.env.EMAIL_DOMAIN);