const getProfessionById = (id, professions) => {
  for (const prof of professions) {
    if (prof.value === id) {
      return { _id: prof.value, name: prof.label };
    }
  }
};

const getQualities = (elements, qualities) => {
  const qualitiesArray = [];
  for (const elem of elements) {
    for (const quality in qualities) {
      if (elem.value === qualities[quality].value) {
        qualitiesArray.push({
          _id: qualities[quality].value,
          name: qualities[quality].label,
          color: qualities[quality].color
        });
      }
    }
  }
  return qualitiesArray;
};

export default {
  getProfessionById,
  getQualities
};
