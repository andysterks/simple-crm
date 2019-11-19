const mongo = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';

function derp(dbName) {
  const config = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }

  mongo.connect(url, config, (err, client) => {
    if (err) {
      console.error(err);
      return;
    }

    const db = client.db('simple-crm');
    const collection = db.collection('table-schema');

    collection.find.toArray((err, items) => {
      console.log(items);
    })
  });
}



module.exports = {
  derp
}

var herp = {
  column_name: 'email'
}

db.table_schema.insert({
  data: [
    {
      column_id: ObjectId("5dd451c5c29eb27ac753acab"),
      value: 'Andy S'
    },
    {
      column_id: ObjectId("5dd45257c29eb27ac753acad"),
      value: 'andy@gmail.com'
    }
  ]
})