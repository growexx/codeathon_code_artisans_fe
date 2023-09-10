import { TOKEN_KEY, USER_DATA_KEY } from './constants';
import StorageService from './StorageService';

export function userExists() {
  if (StorageService.exists(TOKEN_KEY)) {
    return true;
  }
  return false;
}

/**
 * Get User Data
 * @returns
 */
export function getUserData() {
  if (StorageService.exists(TOKEN_KEY)) {
    return StorageService.get(USER_DATA_KEY);
  }
  return false;
}

/**
 * to logout user from system
 */
export function logout() {
  StorageService.clear();
}

export function manageSession() {
  if (!localStorage.userData && !localStorage.loggedOut) {
    localStorage.setItem('loggedOut', 1);
    window.location.reload();
  } else if (localStorage.userData && !localStorage.loggedIn) {
    localStorage.setItem('loggedIn', 1);
    window.location.reload();
  }
}
