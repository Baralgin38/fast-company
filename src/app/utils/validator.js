export function validator(data, config) {
  const errors = {};

  function validate(validateMethod, data, config) {
    let validateStatus = '';
    switch (validateMethod) {
      case 'isRequired':
        validateStatus = data.trim() === '';
        break;
      case 'isEmail': {
        const isEmailRegExp = /^\S+@\S+\.\S+$/g;
        validateStatus = !isEmailRegExp.test(data);
        break;
      }
      case 'isCapitalLetter': {
        const isCapitalLetterRegExp = /[A-Z]+/g;
        validateStatus = !isCapitalLetterRegExp.test(data);
        break;
      }
      case 'isContainDigit': {
        const isContainDigitRegExp = /\d+/g;
        validateStatus = !isContainDigitRegExp.test(data);
        break;
      }
      case 'min':
        validateStatus = data.length < config.value;
        break;
      default:
        break;
    }
    if (validateStatus) return config.message;
  }

  for (const fieldName in data) {
    for (const validateMethod in config[fieldName]) {
      const error = validate(
        validateMethod,
        data[fieldName],
        config[fieldName][validateMethod]
      );
      if (error && !errors[fieldName]) {
        errors[fieldName] = error;
      }
    }
  }
  return errors;
}
