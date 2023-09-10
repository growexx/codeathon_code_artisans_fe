import validator from 'validator';

export const VALIDATION_MESSAGES = {
  EMAIL: 'Email is invalid!',
  URL: 'URL is invalid!',
  REQUIRED: 'Required!',
};
const isEmpty = value =>
  value === undefined || value === null || validator.isEmpty(value);
const join = rules => (value, data, props) =>
  rules
    .map(rule => rule(value, data, props))
    /* first error */
    .filter(error => !!error)[0];

/**
 * Email validation
 * @param(value)
 */

export function validEmail(value) {
  if (isEmpty(value) || !validator.isEmail(value)) {
    return VALIDATION_MESSAGES.EMAIL;
  }

  return '';
}

/**
 * isUrl validation
 *
 * @param(value)
 */

export function validUrl(value) {
  if (isEmpty(value) || !validator.isURL(value)) {
    return VALIDATION_MESSAGES.URL;
  }
  return false;
}

/**
 * required validation
 *
 * @param(value)
 */
export function required(value) {
  if (isEmpty(value)) {
    return VALIDATION_MESSAGES.REQUIRED;
  }
  return '';
}

/**
 * rules
 *
 * @param(rules).
 */

export function createValidator(rules) {
  return (data = {}, props) => {
    const errors = {};
    Object.keys(rules).forEach(key => {
      const rule = join([].concat(rules[key])); // concat enables both functions and arrays of functions
      const error = rule(data[key], data, props);
      if (error) {
        errors[key] = error;
      }
    });
    return errors;
  };
}

/* eslint-disable arrow-body-style */
