const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateRegisterInput(data) {
  const errors = {};
  const minLengthName = 2;
  const maxLengthName = 30;
  const minLengthPass = 6;
  const maxLengthPass = 256;

  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  if ( !Validator.isLength(data.name, { min: minLengthName, max: maxLengthName }) ) {
    errors.name = `Name must be between ${minLengthName} and ${maxLengthName} characters`
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is not valid";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (Validator.isLength(data.password, {min: minLengthPass, max: maxLengthPass})) {
    errors.password = `Password must be at least ${minLengthPass} characters`;
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Password2 field is required";
  }

  if (Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  }
}