const express = require('express');
const router = require("./src/routes")
const logger = require("./src/middlewares/logMiddleware")
const errorHandler = require("./src/middlewares/errorHandler");
const notFoundHandler = require('./src/middlewares/notFoundHandler');

require("./src/db/mongoose")

const app = express();

const port = process.env.port || 3000

app.use(express.json())
app.use(logger)

app.use("/api", router)

app.use(notFoundHandler)
app.use(errorHandler)

app.listen(port, () => {
    console.log("Server is up on port " + port)
})