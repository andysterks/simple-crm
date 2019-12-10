const dbConnection = require('./db-connection');

async function getSchema() {
  const client = await dbConnection.getClient();

  let schema = [];

  try {
    const db = client.db("simple_crm");
    const tableSchemaCollection = db.collection("table_schema");

    schema = await tableSchemaCollection.find().toArray();
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
    return schema;
  }
}

module.exports = {
  getSchema
};