import {
  selectLogin,
  makeSelectEmail,
  makeSelectPassword,
  makeSelectLoading,
  makeSelectSuccess,
  makeSelectError,
} from '../selectors';
describe('Login Selectors Testing', () => {
  it('Testing selectLogin', () => {
    const mockState = {
      login: {
        email: 'email',
        password: 'password',
        error: 'error',
      },
    };
    expect(selectLogin(mockState)).toEqual({
      email: 'email',
      password: 'password',
      error: 'error',
    });
  });
  it('Testing selectLogin with initial state', () => {
    const mockState = {
      email: 'email',
      password: 'password',
      error: 'error',
    };
    expect(selectLogin(mockState)).toEqual({
      email: '',
      password: '',
      loading: false,
      error: false,
      success: false,
    });
  });
  it('Testing makeSelectEmail', () => {
    const mockState = {
      login: {
        email: 'email',
        password: 'password',
        error: 'error',
      },
    };
    const result = { email: 'email', password: 'password', error: 'error' };
    const sel = makeSelectEmail(mockState);
    const actual = sel.resultFunc(result);
    const expected = 'email';
    expect(actual).toEqual(expected);
  });
  it('Testing makeSelectError', () => {
    const mockState = {
      login: {
        email: 'email',
        password: 'password',
        error: 'error',
      },
    };
    const result = { email: 'email', password: 'password', error: 'error' };
    const sel = makeSelectError(mockState);
    const actual = sel.resultFunc(result);
    const expected = 'error';
    expect(actual).toEqual(expected);
  });
  it('Testing makeSelectPassword', () => {
    const mockState = {
      login: {
        email: 'email',
        password: 'password',
        error: 'error',
      },
    };
    const result = { email: 'email', password: 'password', error: 'error' };
    const sel = makeSelectPassword(mockState);
    const actual = sel.resultFunc(result);
    const expected = 'password';
    expect(actual).toEqual(expected);
  });
  it('Testing makeSelectLoading', () => {
    const mockState = {
      login: {
        email: 'email',
        password: 'password',
        error: 'error',
        loading: true,
      },
    };
    const result = {
      email: 'email',
      password: 'password',
      error: 'error',
      loading: true,
    };
    const sel = makeSelectLoading(mockState);
    const actual = sel.resultFunc(result);
    const expected = true;
    expect(actual).toEqual(expected);
  });
  it('Testing makeSelectSuccess', () => {
    const mockState = {
      login: {
        email: 'email',
        password: 'password',
        error: 'error',
        loading: true,
        success: true,
      },
    };
    const result = {
      email: 'email',
      password: 'password',
      error: 'error',
      loading: true,
      success: true,
    };
    const sel = makeSelectSuccess(mockState);
    const actual = sel.resultFunc(result);
    const expected = true;
    expect(actual).toEqual(expected);
  });
});
