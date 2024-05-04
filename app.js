const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/api/view', (req, res) => {
  res.render('index', { title: 'Hey', message: 'Hello there!' });
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
