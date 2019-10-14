fetchProspects().then(prospects => {
  createProspectTable(prospects);
});

function fetchProspects() {
  return fetch("api/prospects")
    .then(res => res.json());
}