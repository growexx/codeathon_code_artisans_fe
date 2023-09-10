import {
  required,
  VALIDATION_MESSAGES,
  validEmail,
  validUrl,
  createValidator,
} from 'utils/formValidations';
const formValueTestingScenarios = {
  UNDEFINED: undefined,
  NULL: null,
  EMPTY: '',
  VALIDATOR_FALSE_EMAIL: 'testInvalidEmail',
  VALIDATOR_TRUE_EMAIL: 'dev@growexx.com',
  VALIDATOR_FALSE_URL: 'testInvalidUrl',
  VALIDATOR_TRUE_URL: 'www.growexx.com',
  VALID_REQUIRED_VALUE: 'validValue',
  VALID_REQUIRED_VALUE_TRIM_ABLE: '   validValue  ',
};
describe('valid email', () => {
  test('valid email with value undefined', () => {
    expect(validEmail(formValueTestingScenarios.UNDEFINED)).toBe(
      VALIDATION_MESSAGES.EMAIL,
    );
  });
  test('valid email with value null', () => {
    expect(validEmail(formValueTestingScenarios.NULL)).toBe(
      VALIDATION_MESSAGES.EMAIL,
    );
  });
  test('valid email with empty email', () => {
    expect(validEmail(formValueTestingScenarios.EMPTY)).toBe(
      VALIDATION_MESSAGES.EMAIL,
    );
  });
  test('valid email with false email', () => {
    expect(validEmail(formValueTestingScenarios.VALIDATOR_FALSE_EMAIL)).toBe(
      VALIDATION_MESSAGES.EMAIL,
    );
  });
  test('valid email with true email', () => {
    expect(validEmail(formValueTestingScenarios.VALIDATOR_TRUE_EMAIL)).toBe('');
  });
});
describe('valid url', () => {
  test('valid url with value undefined', () => {
    expect(validUrl(formValueTestingScenarios.UNDEFINED)).toBe(
      VALIDATION_MESSAGES.URL,
    );
  });
  test('valid url with value null', () => {
    expect(validUrl(formValueTestingScenarios.NULL)).toBe(
      VALIDATION_MESSAGES.URL,
    );
  });
  test('valid url with empty url', () => {
    expect(validUrl(formValueTestingScenarios.EMPTY)).toBe(
      VALIDATION_MESSAGES.URL,
    );
  });
  test('valid url with false url', () => {
    expect(validUrl(formValueTestingScenarios.VALIDATOR_FALSE_URL)).toBe(
      VALIDATION_MESSAGES.URL,
    );
  });
  test('valid url with true url', () => {
    expect(validUrl(formValueTestingScenarios.VALIDATOR_TRUE_URL)).toBe(false);
  });
});
describe('required', () => {
  test('required with undefined value', () => {
    expect(required(formValueTestingScenarios.UNDEFINED)).toBe(
      VALIDATION_MESSAGES.REQUIRED,
    );
  });
  test('required with null value', () => {
    expect(required(formValueTestingScenarios.NULL)).toBe(
      VALIDATION_MESSAGES.REQUIRED,
    );
  });
  test('required with empty value', () => {
    expect(required(formValueTestingScenarios.EMPTY)).toBe(
      VALIDATION_MESSAGES.REQUIRED,
    );
  });
  test('required with true value', () => {
    expect(required(formValueTestingScenarios.VALID_REQUIRED_VALUE)).toBe('');
  });
  test('required with trim able value', () => {
    expect(
      required(formValueTestingScenarios.VALID_REQUIRED_VALUE_TRIM_ABLE),
    ).toBe('');
  });
});

describe('createValidator function test', () => {
  test('required with undefined value', () => {
    const validationFunction = createValidator({
      email: [required, validEmail],
    });

    expect(validationFunction({}, {}).email).toBe(VALIDATION_MESSAGES.REQUIRED);

    expect(
      validationFunction(
        { email: formValueTestingScenarios.VALIDATOR_FALSE_URL },
        {},
      ).email,
    ).toBe(VALIDATION_MESSAGES.EMAIL);

    expect(validationFunction(undefined, {}).email).toBe(
      VALIDATION_MESSAGES.REQUIRED,
    );

    expect(
      validationFunction(
        { email: formValueTestingScenarios.VALIDATOR_TRUE_EMAIL },
        {},
      ).email,
    ).toBe(undefined);
  });
});
