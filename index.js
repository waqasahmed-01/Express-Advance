// Building an vidly app.
const debug = require('debug');
const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const authentication = require('./middleware/authentication.js');
const logging = require('./middleware/logging.js');
const Joi = require('joi');
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

//Third party middleware.
app.use(helmet());
app.use(morgan('tiny'));

//custom middleware.
app.use(logging);
app.use(authentication);

const genres = [
  { id: 1, name: 'Horror' },
  { id: 2, name: 'Comedy' },
  { id: 3, name: 'Romance' },
];

app.get('/api/genres', function (req, res) {
  res.send(genres);
});

app.get('/api/genres/:id', function (req, res) {
  const genre = genres.find((c) => c.id === parseInt(req.params.id));
  if (genre) {
    res.send(genre);
    return;
  } else {
    res.status(404);
    res.send('Id Not Found');
    return;
  }
});

//update
app.put('/api/genres/:id', function (req, res) {
  const genre = genres.find((find) => find.id === parseInt(req.params.id));
  if (!genre) {
    res.status(404);
    res.send('Id not found');
    return;
  }

  //valiadte input
  const schema = {
    name: Joi.string().min(5).required(),
  };
  const validations = Joi.validate(req.body, schema);
  if (validations.error) {
    res.status(400);
    res.send(validations.error.details[0].message);
    return;
  }

  //update.
  genre.name = req.body.name;
  res.send(genre);
});

//Creating.

app.post('/api/genres', function (req, res) {
  const schema = {
    name: Joi.string().min(5).required(),
  };

  const validationResult = Joi.validate(req.body, schema);

  if (validationResult.error) {
    res.send(validationResult.error.details[0].message);
    res.status(400);
    return;
  }

  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };
  genres.push(genre);
  res.send(genre);
});

//Remove.
app.delete('/api/genres/:id', (req, res) => {
  const genre = genres.find((find) => find.id === parseInt(req.params.id));
  if (!genre) {
    res.status(404).send('Id not found');
    return;
  }

  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  // res.send(genre);
  res.send('Deleted Successfully');
});

const port = global.process.env.PORT || 5500;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
