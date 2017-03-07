"use strict";
const pull_request_middleware_1 = require("./pull-request.middleware");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.post(`/hooks/bitbucket-server`, pull_request_middleware_1.pullRequestMiddleware, (req, res) => {
    res.end();
});
app.listen(port, () => console.log('Server listening on port ' + port));
