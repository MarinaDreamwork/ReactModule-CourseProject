export function validator (data, config) {
  const errors = {};
  let validatorStatus;
  function validate (validateMethod, data, config) {
    switch (validateMethod) {
    case 'isRequired': {
      if (typeof data === 'boolean') {
        validatorStatus = !data;
      } else {
        validatorStatus = data.trim() === '';
      }
      break;
    }
    case 'isEmail': {
      const emailRegExp = /^\S+@\S+\.\S+$/g;
      validatorStatus = !emailRegExp.test(data);
      break;
    }
    case 'isCapitalLetter': {
      const capitalLetterRegExp = /[A-Z]+/g;
      validatorStatus = !capitalLetterRegExp.test(data);
      break;
    }
    case 'isContainDigit': {
      const digitRegExp = /\d+/g;
      validatorStatus = !digitRegExp.test(data);
      break;
    }
    case 'min': {
      validatorStatus = data.length < config.value;
      break;
    }
    default:
      break;
    }
    if (validatorStatus) return config.message;
  }
  for (const fieldName in data) {
    for (const validateMethod in config[fieldName]) {
      const error = validate(validateMethod, data[fieldName], config[fieldName][validateMethod]);
      if (error && !errors[fieldName]) {
        errors[fieldName] = error;
      };
    }
  }
  return errors;
};
