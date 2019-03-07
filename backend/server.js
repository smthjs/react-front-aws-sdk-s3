const express = require('express');
const bodyParser = require("body-parser");
const path = require("path");
const staticRoutes = require("./middleware/staticRoutes");
const router = require('./app/routers');

const app = express();

const publicPath = path.resolve(__dirname, "public");

app.use(express.static(publicPath));

app.use(staticRoutes);

app.use(bodyParser.json());

app.use('/', router);
 
const port = 9001;

app.listen(port, () => console.log(`listening on port ${port}`));