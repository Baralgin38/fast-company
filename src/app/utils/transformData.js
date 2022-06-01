// Немного дописал функцию - при обновлении данных пользователя если не менять профессию,
// то в функцию улетал объект с полями 'name' и 'id' а внутри условие ищет поле value для преобразования.
const getProfessionById = (id, professions) => {
  for (const prof of professions) {
    if (typeof id !== 'object') {
      if (prof.value === id) {
        return { _id: prof.value, name: prof.label };
      }
    } else {
      return id;
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
