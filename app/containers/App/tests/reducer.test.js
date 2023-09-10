import produce from 'immer';

import appReducer from '../reducer';
import { loadRepos, reposLoaded, repoLoadingError } from '../actions';
import { LOAD_APP } from '../constants';

/* eslint-disable default-case, no-param-reassign */
describe('appReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      loading: false,
      error: false,
      currentUser: false,
      userData: {
        repositories: false,
      },
      appLoading: false,
    };
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(appReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the loadRepos action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.loading = true;
      draft.error = false;
      draft.userData.repositories = false;
    });

    expect(appReducer(state, loadRepos())).toEqual(expectedResult);
  });

  it('should handle the reposLoaded action correctly', () => {
    const fixture = [
      {
        name: 'My Repo',
      },
    ];
    const username = 'test';
    const expectedResult = produce(state, draft => {
      draft.userData.repositories = fixture;
      draft.loading = false;
      draft.currentUser = username;
    });

    expect(appReducer(state, reposLoaded(fixture, username))).toEqual(
      expectedResult,
    );
  });

  it('should handle the repoLoadingError action correctly', () => {
    const fixture = {
      msg: 'Not found',
    };
    const expectedResult = produce(state, draft => {
      draft.error = fixture;
      draft.loading = false;
    });

    expect(appReducer(state, repoLoadingError(fixture))).toEqual(
      expectedResult,
    );
  });
  it('should handle LOADING', () => {
    expect(
      appReducer(state, {
        type: LOAD_APP,
        appLoading: true,
      }),
    ).toEqual({
      ...state,
      appLoading: true,
    });
  });
});
