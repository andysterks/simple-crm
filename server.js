const express = require('express');
const app = express();
const path = require('path');

const Prospect = require('./models/prospect')

const prospects = [
  new Prospect('Andy', 'andys@email.com'),
  new Prospect('Kuma', 'kuma@email.com')
];

const port = process.env.port || 3000;

app.use(express.json());
app.use('/', express.static('client'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'))
});

app.put('/api/prospects/:id', (req, res) => {

  console.log(req.body);
  console.log(req.params.id);
  const prospectResults = prospects.filter(prospect => {
    return prospect.id === req.params.id;
  });

  if (prospectResults.length === 1) {
    const prospectToUpdate = prospectResults[0];
    prospectToUpdate.email = req.body.email;
    prospectToUpdate.name = req.body.name;
    console.log(prospects);

    res.sendStatus(204);
  } else {
    res.sendStatus(500);
  }
});

app.get('/api/prospects', (req, res) => {
  res.send(prospects);
});

app.listen(port, () => { console.log(`Server listing on ${port}!`)});