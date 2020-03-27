const express = require('express');
const connection = require('./dbconnect');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
let rowLength;


router.get('/', (req, res, next) => {
  connection.execute('SELECT * FROM `loginInfo`', (err, rows, fields) => {
    if (err) {
      return next(err);
    }
    res.status(201).json(rows);
  });
});

function logNum(num, url) {
  console.log(url)
  connection.execute('UPDATE `loginInfo` SET `loginInfo`.`website` = ? WHERE `loginInfo`.`website` IS NOT NULL;', [url], (err, rows, fields) => {
    if (err) {
      console.error(err);
    }
  });
}

router.patch('/', jsonParser, (req, res, next) => {
  let url = req.body.urlToPost;
  connection.execute('SELECT * FROM `loginInfo`', (err, rows, fields) => {
    if (err) {
      return next(err);
    }
   logNum(rows.length, url)
  });
});


module.exports = router;
