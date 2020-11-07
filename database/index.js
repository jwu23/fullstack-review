const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Opened')
});

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  id: Number,
  name: String,
  forks: Number,
  url: String

});

let Repo = mongoose.model('Repo', repoSchema);

let find = (callback) => {
  Repo.find({}, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      var result = [];
      for (var i = 0; i < info.length; i++) {
        result.push(info[i]._doc);
      }
      // console.log('result',result)
      callback(null, result);
    }
  })
}

let save = (data) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  // console.log(data)
  for (var i = 0; i < data.length; i++) {
    const saveData = new Repo({
      id: data[i].id,
      name: data[i].name,
      forks: data[i].forks,
      url: data[i].html_url
    });
    saveData.save((err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Saved');
      }
    })
  }
}

module.exports.save = save;
module.exports.find = find;