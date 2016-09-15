'use strict';
const express = require('express');
const path = require('path');

const app = express();

const port = process.env.PORT || 0; // dynamic port so parallel unit tests don't fail
const htmlPath = process.env.HTML_PATH || 'public';
const jsPath = process.env.JS_PATH || 'public';
const host = 'localhost';
const httpServer = app.listen(port, host);
const debugEnabled = process.env.NODE_ENV !== 'production';

httpServer.on('listening', () => {
  const addr = httpServer.address();
  const bind = (typeof addr === 'string') ? `pipe${addr}` : `port ${addr.port}`;
  console.log(`Listening on ${bind}`);
});

// Used only in development or debugging a customer site when we put the debug package on the box
app.use('/js/debug', express.static(path.resolve(jsPath, 'js', 'debug')));

// Route the client to the regular or debug version based on how the server started
app.use('/js', express.static(path.resolve(jsPath, 'js', debugEnabled ? 'debug' : '')));

// Catch all always returns the index page
app.use('/*', express.static(htmlPath));

// Don't advertise our server tech
app.disable('x-powered-by');
