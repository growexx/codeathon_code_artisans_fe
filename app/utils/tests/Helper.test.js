import { getUserData, logout, userExists, manageSession } from 'utils/Helper';
import { TOKEN_KEY, USER_DATA_KEY } from '../constants';

import StorageService from '../StorageService';

describe('Helper', () => {
  test('getUserData user exists', () => {
    StorageService.set(TOKEN_KEY, 'tokenvalue', {
      stringify: true,
      hash: true,
    });
    StorageService.set(USER_DATA_KEY, 'uservalue');
    expect(getUserData()).toBe(StorageService.get(USER_DATA_KEY));
  });
  test('getUserData user not exists', () => {
    StorageService.clear();
    expect(getUserData()).toBe(false);
  });
  test('userExists user not exists', () => {
    StorageService.clear();
    expect(userExists()).toBe(false);
  });
  test('userExists user exists', () => {
    StorageService.set(TOKEN_KEY, 'tokenvalue');
    expect(userExists()).toBe(true);
  });
  test('logout', () => {
    StorageService.set(TOKEN_KEY, 'tokenvalue');
    logout();
    expect(userExists()).toBe(false);
  });
  test('manageSession on logout', () => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(() => null),
      },
      writable: true,
    });
    manageSession();
    expect(localStorage.setItem).toHaveBeenCalled();
  });
  test('manageSession on login', () => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(() => null),
      },
      writable: true,
    });
    localStorage.userData = true;
    manageSession();
    expect(localStorage.setItem).toHaveBeenCalled();
  });
});
