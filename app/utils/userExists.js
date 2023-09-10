import { TOKEN_KEY } from './constants';
import StorageService from './StorageService';

export function userExists() {
  if (StorageService.exists(TOKEN_KEY)) {
    return true;
  }
  return false;
}
