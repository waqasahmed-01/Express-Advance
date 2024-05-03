//working
const express = require('express');
const app = express();

console.log('App:' + app.get('env'));

if (app.get('env') === 'development') {
  console.log('Env to Dev');
  return;
}

if (app.get('env') === 'production') {
  console.log('Env to Prod');
  return;
}
