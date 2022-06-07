import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '../common/form/textField';
import SelectField from '../common/form/selectField';
import api from '../../api';
import RadioField from '../common/form/radioField';
import MultiSelectField from '../common/form/multiSelectField';
import transformUserData from '../../utils/transformUserData';
import { validator } from '../../utils/validator';
import { useHistory } from 'react-router-dom';

const EditUserForm = ({ userId }) => {
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    name: '',
    email: '',
    profession: '',
    sex: 'male',
    qualities: []
  });
  const [professions, setProfessions] = useState([]);
  const [qualities, setQualities] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setIsLoading(true);
    api.users.getUserById(userId).then(({ profession, qualities, ...data }) => {
      setData((prevState) => ({
        ...prevState,
        ...data,
        qualities: transformData(qualities),
        profession: profession._id
      }));
    });
    api.professions.fetchAll().then((data) => {
      const professionsList = Object.keys(data).map((professionName) => ({
        label: data[professionName].name,
        value: data[professionName]._id
      }));
      setProfessions(professionsList);
    });
    api.qualities.fetchAll().then((data) => {
      const qualitiesList = Object.keys(data).map((optionName) => ({
        value: data[optionName]._id,
        label: data[optionName].name,
        color: data[optionName].color
      }));
      setQualities(qualitiesList);
    });
  }, []);

  useEffect(() => {
    if (data._id) setIsLoading(false);
  }, [data]);

  useEffect(() => {
    validate();
  }, [data]);

  const transformData = (data) => {
    return data.map((qual) => ({ label: qual.name, value: qual._id }));
  };

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const isValidate = validate();
    if (!isValidate) return;

    const { profession: professionId, qualities: userQualities } = data;

    api.users
      .update(userId, {
        ...data,
        profession: transformUserData.getProfessionById(
          professionId,
          professions
        ),
        qualities: transformUserData.getQualities(userQualities, qualities)
      })
      .then((data) => history.push(`/users/${data._id}`));
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validatorConfig = {
    email: {
      isRequired: {
        message: 'Электронная почта обязательна для заполнения'
      },
      isEmail: {
        message: 'Электронная почта введена некорректно'
      }
    },
    name: {
      isRequired: {
        message: 'Имя обязательно для заполнения'
      }
    }
  };

  const isValid = Object.keys(errors).length === 0;

  return !isLoading && Object.keys(professions).length > 0 ? (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Имя"
        name="name"
        value={data.name}
        onChange={handleChange}
        error={errors.name}
      />
      <TextField
        label="Электронная почта"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <SelectField
        label="Выберите свою профессию"
        value={data.profession}
        name="profession"
        options={professions}
        defaultOption="Choose.."
        onChange={handleChange}
        error={errors.profession}
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
      <button
        type="submit"
        className="btn btn-primary w-100 mx-auto"
        disabled={!isValid}
      >
        Обновить данные
      </button>
    </form>
  ) : (
    'Loading...'
  );
};

EditUserForm.propTypes = {
  userId: PropTypes.string
};

export default EditUserForm;
