const mongo = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017";

function derp() {
  const config = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  };

  mongo.connect(url, config, (err, client) => {
    if (err) {
      console.error(err);
      return;
    }

    const db = client.db("simple_crm");
    const tableSchemaCollection = db.collection("table_schema");
    const prospectsCollection = db.collection("prospects");

    prospectsCollection.find().toArray((err, prospects) => {
      console.log(prospects);
      prospects.forEach(prospect => {
        const newProspects = [];
        prospect.data.forEach(dataColumn => {
          const newProspect = {};
          console.log(dataColumn);
          tableSchemaCollection.findOne({
            "_id": dataColumn.column_id
          }, function(err, result) {
            if (err) {
              console.error(err);
            }
            console.log("matchingColumn: ", result);
            if (result !== null) {
              dataColumn.column_name = result.column_name;
            }
            console.log(prospect.data);
            newProspect[result.column_name] = dataColumn.value;
          });
          newProspects.push(newProspect);
          console.log(newProspect);
        });
        client.close();
      });
    });
  });
}

module.exports = {
  derp
};

/* var herp = {
  column_name: 'email'
}

db.prospects.insert({
  data: [
    {
      column_id: ObjectId("5dd451c5c29eb27ac753acab"),
      value: 'Andy S'
    },
    {
      column_id: ObjectId("5dd45257c29eb27ac753acad"),
      value: 'andy@gmail.com'
    }
  ],
  created: new Date(),
  modifed: new Date()
}) */
