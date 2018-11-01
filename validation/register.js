const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateRegisterInput(data) {
  const errors = {};
  const minLength = 2;
  const maxLength = 30;

  if ( !Validator.isLength(data.name, { min: minLength, max: maxLength }) ) {
    errors.name = `Name must be between ${minLength} and ${maxLength} characters`
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  }
}