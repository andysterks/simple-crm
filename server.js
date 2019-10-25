const express = require("express");
const app = express();
const path = require("path");

const prospectService = require("./data/prospect-service");

const port = process.env.port || 3000;

app.use(express.json());
app.use("/", express.static("client"));

// error handling middleware
app.use(function(err, req, res, next) {
  res.sendStatus(500);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "index.html"));
});

app.get("/api/prospects", (req, res) => {
  res.send(prospectService.getAllProspects());
});

app.post("/api/prospects", (req, res) => {
  prospectService.createProspect(req.body.name, req.body.email);
  res.sendStatus(201);
});

app.put("/api/prospects/:id", (req, res) => {
  prospectService.updateProspect(req.params.id, req.body);
  res.sendStatus(204);
});

app.delete("/api/prospects/:id", (req, res) => {
  prospectService.deleteProspect(req.params.id);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server listing on ${port}!`);
});
