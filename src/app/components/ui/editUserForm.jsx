import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TextField from '../common/form/textField';
import SelectField from '../common/form/selectField';
import RadioField from '../common/form/radioField';
import MultiSelectField from '../common/form/multiSelectField';
import { validator } from '../../utils/validator';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useProfessions } from '../../hooks/useProfession';
import { useSelector } from 'react-redux';
import { getQualities, getQualitiesLoadingStatus } from '../../store/qualities';

const EditUserForm = ({ userId }) => {
  const history = useHistory();

  const [data, setData] = useState({
    name: '',
    email: '',
    profession: '',
    sex: 'male',
    qualities: []
  });

  const [errors, setErrors] = useState({});
  const { currentUser, updateUser } = useAuth();
  const { professions } = useProfessions();

  const qualities = useSelector(getQualities());
  const isQualitiesLoading = useSelector(getQualitiesLoadingStatus());

  useEffect(() => {
    if (!isQualitiesLoading) {
      setData((prevState) => ({
        ...prevState,
        ...currentUser,
        qualities: transformData(currentUser.qualities)
      }));
    }
  }, [isQualitiesLoading]);

  const professionsList = professions.map((prof) => ({
    label: prof.name,
    value: prof._id
  }));

  const qualitiesList = qualities.map((qual) => ({
    value: qual._id,
    label: qual.name,
    color: qual.color
  }));

  useEffect(() => {
    if (data.qualities.length > 0) validate();
  }, [data]);

  function transformData(data) {
    return data.map((qual) => qualitiesList.find((q) => q.value === qual));
  }

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const isValidate = validate();
    if (!isValidate) return;

    updateUser({
      ...data,
      qualities: data.qualities.map((qual) => qual.value)
    }).then(() => history.push(`/users/${currentUser._id}`));
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

  return data.qualities.length > 0 ? (
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
        options={professionsList}
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
        options={qualitiesList}
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
