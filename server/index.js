const express = require('express');
const parser = require('body-parser');
const github = require('../helpers/github.js');
const db = require('../database/index.js')

let app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.use(parser.urlencoded());
app.use(parser.json());

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  console.log('requested user', req.body)
  github.getReposByUsername(req.body.username);
  res.send();
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  // var contents = db.find();
  // console.log('contents', contents)
  db.find((err, data) => {
    if (err) {
      console.log('error', err);
      res.sendStatus(404);
    } else {
      // console.log('data', data[14].forks);
      if (data.length === 0) {
        res.send([])
      } else {
        res.send(data);
      }
    }
  })
  // console.log(data)
  // res.send()
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

