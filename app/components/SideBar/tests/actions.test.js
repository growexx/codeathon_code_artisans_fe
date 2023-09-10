import * as actions from '../actions';
import * as types from '../constants';

describe('Actions Testing', () => {
  it('should create an action to add sidebar item', () => {
    const expectedAction = {
      type: types.ADD_SIDEBAR_ITEM,
      data: [],
    };
    expect(actions.addSidebarItem([])).toEqual(expectedAction);
  });
  it('should create an action to remove sidebar item', () => {
    const expectedAction = {
      type: types.REMOVE_SIDEBAR_ITEM,
      id: '1',
    };
    expect(actions.removeSidebarItem('1')).toEqual(expectedAction);
  });
  it('should create an action to load sidebar items', () => {
    const expectedAction = {
      type: types.LOAD_SIDEBAR_ITEMS,
    };
    expect(actions.loadSidebarItems()).toEqual(expectedAction);
  });
  it('should create an action to add sidebar item', () => {
    const expectedAction = {
      type: types.ADD_SIDEBAR_ITEM,
      data: [],
    };
    expect(actions.addSidebarItem([])).toEqual(expectedAction);
  });
  it('should create an action to load sidebar items', () => {
    const expectedAction = {
      type: types.LOAD_SIDEBAR_ITEMS_SUCCESS,
      data: [],
    };
    expect(actions.loadDataSuccess([])).toEqual(expectedAction);
  });
});
