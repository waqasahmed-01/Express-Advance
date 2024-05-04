const Joi = require('joi');
const express = require('express');
const router = express.Router();

const genres = [
  { id: 1, name: 'Horror' },
  { id: 2, name: 'Comedy' },
  { id: 3, name: 'Romance' },
];

router.get('/', function (req, res) {
  res.send(genres);
});

router.get('/:id', function (req, res) {
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
router.put('/:id', function (req, res) {
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

router.post('/', function (req, res) {
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
router.delete('/:id', (req, res) => {
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

module.exports = router;
