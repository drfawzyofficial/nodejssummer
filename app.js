// Include all packages
const express = require('express');
const responseTime = require('response-time')
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
require('./connection/mongoose');
const path = require('path');
const helmet = require("helmet");
const port = process.env.PORT || 3000;

// Use all packages
const app = express();
app.use(helmet());
app.use(responseTime())
app.use(morgan('dev'))
dotenv.config({path: __dirname + '/.env'})
app.use(cors())
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.json()); 
app.use(express.urlencoded()); 
app.use(express.urlencoded({ extended: true }));

// Use All Routes
const { Admin } = require('./routes/index');
app.use('/api/admin', Admin);

// App is running on port 3000
app.listen(port, () => {
    console.log(`Running on Port: ${ port }`)
});