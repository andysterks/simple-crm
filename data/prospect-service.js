const Prospect = require('../models/prospect')

const prospects = [
  new Prospect('Andy', 'andys@email.com'),
  new Prospect('Kuma', 'kuma@email.com')
];

const getAllProspects = () => {
  return prospects;
};

const getProspect = (id) => {
  const prospectResults = prospects.filter(prospect => {
    return prospect.id === id;
  });

  if (prospectResults.length !== 1) {
    throw new Error(`no prospect found for id: ${id}`);
  }

  return prospectResults[0];
};

const updateProspect = (id, updateProspect) => {
  const prospect = getProspect(id);

  if(prospect) {
    prospect.name = updateProspect.name;
    prospect.email = updateProspect.email;
  }

  return prospect;
};

const deleteProspect = (id) => {
  const prospect = getProspect(id);
  const prospectIndex = prospects.indexOf(prospect);
  if (prospectIndex === -1) {
    throw new Error(`no prospect to delete at index ${prospectIndex}`)
  }

  prospects.splice(prospectIndex, 1);
}

module.exports = {
  getAllProspects,
  getProspect,
  updateProspect,
  deleteProspect
}