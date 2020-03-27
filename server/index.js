const path = require('path');
const connection = require('./public/dbconnect');
const express = require('express');
const loginServer = require('./public/loginServer');
const cors = require('cors');


const server = express();
let PORT = 3000;

connection.connect();

server.use(cors());
server.use('/api/loginServer', loginServer);
server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

server.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: 'An unexpected error has occurred'
  });

});

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('The server is now ALLOWED');
});
