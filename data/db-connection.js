const mongo = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017";

async function getClient() {
  const config = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  };

  const client = await mongo
    .connect(url, config)
    .catch(err => console.log(err));
  
  if (!client) {
    throw new Error('No client was created');
  }

  return client;
}

module.exports = {
  getClient
};