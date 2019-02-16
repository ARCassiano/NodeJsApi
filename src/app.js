const http = require("http");
const status = require("http-status");
const express = require("express");
const spoilersRoute = require("./routes/spoiler");
const sequelize = require("./database/database");


const app = express();

app.use(express.json());

app.use('/api', spoilersRoute);

app.use((request, response, next) => {
    response.status(status.NOT_FOUND).send();
});

app.use((error, request, response, next) => {
    response.status(status.INTERNAL_SERVER_ERROR).json({ error });
});

sequelize.sync({ force: false }).then(() => {
    const port = process.env.port || 3000;

    app.set("port", port);

    const server = http.createServer(app);

    server.listen(port);
});