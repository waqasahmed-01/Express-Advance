// Building an vidly app.
const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const Joi = require('joi');
const authentication = require('./middleware/authentication.js');
const logging = require('./middleware/logging.js');
const genres = require('./routes/genres.js');
const express = require('express');
const app = express();

//Configurations
// console.log(app.get('env'));

const enviroment = config.get('name');
const creator = config.get('creator.coder');
console.log(`Name : ${enviroment} And Creator : ${creator}`);

//Express middleware.
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //{ extended: true } => we can pass arrays and objects in  ody of req.
app.use(express.static('public'));
app.use('/api/genres', genres);

//Third party middleware.
app.use(helmet());
app.use(morgan('tiny'));

//custom middleware.
app.use(logging);
app.use(authentication);

const port = global.process.env.PORT || 5500;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
