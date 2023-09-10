import { TOKEN_KEY } from '../constants';
import StorageService from '../StorageService';
import { userExists } from '../userExists';

describe('userExists', () => {
  it('should return false', () => {
    expect(userExists()).toBe(false);
  });
  it('should return true', () => {
    StorageService.set(TOKEN_KEY, 'TESTTOKEN');
    expect(userExists()).toBe(true);
  });
});
