const express = require('express');
const app = express();
const port = 3000;
const helmet = require('helmet');
const notFoundHandler = require('./middleware/404Handler');
const errorHandler = require('./middleware/errorHander');

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use(errorHandler);
app.use(notFoundHandler);
app.use(helmet());

require('dotenv').config();
const dbConnectionString = process.env.DB_CONNECTION_STRING;


app.listen(port, () => {
    console.log(`Server is running now!`);
});
