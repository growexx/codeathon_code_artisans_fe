import * as types from '../constants';
import reducer, { initialState } from '../reducer';
const getFormJsStateInstance = config =>
  Object.assign(
    {
      menuItems: [],
    },
    config,
  );
describe('sidebar reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  it('should handle ADD_SIDEBAR_ITEM', () => {
    expect(
      reducer(initialState, {
        type: types.ADD_SIDEBAR_ITEM,
        data: {},
      }),
    ).toEqual(
      getFormJsStateInstance({
        menuItems: [{}],
      }),
    );
  });
  it('should handle REMOVE_SIDEBAR_ITEM', () => {
    expect(
      reducer(
        { menuItems: [{ chatId: '1' }] },
        {
          type: types.REMOVE_SIDEBAR_ITEM,
          id: '1',
        },
      ),
    ).toEqual(
      getFormJsStateInstance({
        menuItems: [],
      }),
    );
  });
  it('should handle LOAD_SIDEBAR_ITEMS_SUCCESS', () => {
    expect(
      reducer(initialState, {
        type: types.LOAD_SIDEBAR_ITEMS_SUCCESS,
        data: [],
      }),
    ).toEqual(
      getFormJsStateInstance({
        menuItems: [],
      }),
    );
  });
});
