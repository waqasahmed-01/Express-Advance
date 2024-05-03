//working
const debug = require('debug');
const express = require('express');
const app = express();

// process.env.DEBUG = 'app:dev, app:prod';

const devDebug = debug('app:dev');
const prodDebug = debug('app:prod');

// devDebug.enabled = false;
devDebug.enabled = true;
prodDebug.enabled = true;

console.log('App:' + app.get('env'));

if (app.get('env') === 'development') {
  devDebug('Env to Dev');
  return;
}

if (app.get('env') === 'production') {
  prodDebug('Env to Prod');
  return;
}
