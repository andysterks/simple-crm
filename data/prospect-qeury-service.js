const dbConnection = require('./db-connection');

async function getAllProspects() {
  const client = await dbConnection.getClient();

  const newProspects = [];

  try {
    const db = client.db("simple_crm");
    const tableSchemaCollection = db.collection("table_schema");
    const prospectsCollection = db.collection("prospects");

    const prospects = await prospectsCollection.find().toArray();

    for (const prospect of prospects) {
      const newProspect = { id: prospect._id };

      for (const dataColumn of prospect.data) {
        const query = {
          _id: dataColumn.column_id
        };
        const matchingColumn = await tableSchemaCollection.findOne(query);

        if (matchingColumn !== null) {
          newProspect[matchingColumn.column_name] = dataColumn.value;
        }
      }

      newProspects.push(newProspect);
    }
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
    return newProspects;
  }
}

module.exports = {
  getAllProspects
};