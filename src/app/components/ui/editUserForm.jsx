import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '../common/form/textField';
import SelectField from '../common/form/selectField';
import api from '../../api';
import RadioField from '../common/form/radioField';
import MultiSelectField from '../common/form/multiSelectField';
import transformData from '../../utils/transformData';
import { useHistory } from 'react-router-dom';

const EditUserForm = ({ userId }) => {
  const history = useHistory();

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [professions, setProfessions] = useState();
  const [qualities, setQualities] = useState();

  useEffect(() => {
    api.users.getUserById(userId).then((userData) =>
      setData({
        ...userData,
        qualities: transformQualitites(userData.qualities)
      })
    );
    api.professions
      .fetchAll()
      .then((data) => {
        const professionsList = Object.keys(data).map((professionName) => ({
          label: data[professionName].name,
          value: data[professionName]._id
        }));
        setProfessions(professionsList);
      })
      .finally(() => setLoading(false));
    api.qualities.fetchAll().then((data) => {
      const qualitiesList = Object.keys(data).map((optionName) => ({
        value: data[optionName]._id,
        label: data[optionName].name,
        color: data[optionName].color
      }));
      setQualities(qualitiesList);
    });
  }, []);

  const transformQualitites = (qualities) =>
    qualities.slice().map((qualitie) => ({
      value: qualitie._id,
      label: qualitie.name,
      color: qualitie.color
    }));

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const { profession: professionId, qualities: userQualities } = data;

    const updatedData = {
      ...data,
      profession: transformData.getProfessionById(professionId, professions),
      qualities: transformData.getQualities(userQualities, qualities)
    };

    api.users.update(userId, updatedData);
    history.goBack();
  };

  if (isLoading) {
    return 'Loading...';
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Имя"
        name="name"
        value={data.name}
        onChange={handleChange}
      />
      <TextField
        label="Электронная почта"
        name="email"
        value={data.email}
        onChange={handleChange}
      />
      <SelectField
        label="Выберите свою профессию"
        value={data.profession._id}
        name="profession"
        options={professions}
        defaultOption="Choose.."
        onChange={handleChange}
      />
      <RadioField
        options={[
          { name: 'Male', value: 'male' },
          { name: 'Female', value: 'female' }
        ]}
        value={data.sex}
        name="sex"
        onChange={handleChange}
        label="Выберите ваш пол"
      />
      <MultiSelectField
        options={qualities}
        onChange={handleChange}
        defaultValue={data.qualities}
        name="qualities"
        label="Выберите ваши качества"
      />
      <button type="submit" className="btn btn-primary w-100 mx-auto">
        Обновить данные
      </button>
    </form>
  );
};

EditUserForm.propTypes = {
  userId: PropTypes.string
};

export default EditUserForm;
