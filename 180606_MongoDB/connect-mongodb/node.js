const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');

const url = 'mongodb://127.0.0.1:27017';
MongoClient.connect(url, (err, db) => {
  // assert.equal(null, err);
  console.log('Connection successfully to server');
  const dbo = db.db('test');
  dbo.collection('test').find({}).toArray((err, result) => {
    console.log(err);
    console.log(result);
    db.close();
  });
});