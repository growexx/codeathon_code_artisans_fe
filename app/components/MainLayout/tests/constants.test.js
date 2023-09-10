import { showLogoInSideBar } from '../../constants';

describe('component constants', () => {
  it('should return correct boolean values to show logo in sidebar', () => {
    expect(showLogoInSideBar(1)).toBe(true);
    expect(showLogoInSideBar(2)).toBe(false);
  });
});
