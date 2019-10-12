fetch("api/prospects")
  .then(res => res.json())
  .then(prospects => {
    createProspectTable(prospects);
  });