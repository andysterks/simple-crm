const express = require('express');
const app = express();
const path = require('path');

const Prospect = require('./models/prospect')

const port = process.env.port || 3000;

app.use('/', express.static('client'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'))
});

app.get('/api/prospects', (req, res) => {
  const prospects = [
    new Prospect('Andy', 'andys@email.com')
  ];

  res.send(prospects);
});

app.listen(port, () => { console.log(`Server listing on ${port}!`)});