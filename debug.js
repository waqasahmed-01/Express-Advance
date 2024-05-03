const debug = require('debug');
const express = require('express');
const app = express();

//Defining namespaces.
//Lets suppose.

const logDebug = debug('app:log');
const authDebug = debug('app:auth');
const dbDebug = debug('app:db');

//Enable debugging for different namespaces

logDebug.enabled = true;
authDebug.enabled = true;
dbDebug.enabled = true;
//if value set to false the message will not be displayed.

//writing messages.

logDebug('Logging...');
authDebug('Authenticating...');
dbDebug('Connected to database...');
