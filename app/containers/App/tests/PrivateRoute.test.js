import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { HistoryRouter as Router } from 'redux-first-history/rr6';
import history from 'utils/history';
import { TOKEN_KEY } from 'utils/constants';
import { userExists } from 'utils/Helper';
import StorageService from 'utils/StorageService';
import Login from 'containers/Auth/Login/Loadable';
import configureStore from '../../../configureStore';
import PrivateRoute from '../PrivateRoute';

jest.mock('utils/Helper');
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  Navigate: jest.fn(() => <div data-testid="navigate" />),
}));

let globalStore;
const tokenValue = 'test token';
const props = {
  component: Login,
  path: '/admin',
  showError: true,
};
const componentWrapper = () =>
  render(
    <Provider store={globalStore}>
      <IntlProvider locale="en">
        <Router history={history}>
          <PrivateRoute {...props} />
        </Router>
      </IntlProvider>
    </Provider>,
  );

const login = () => StorageService.set(TOKEN_KEY, tokenValue);

describe('<PrivateRoute />', () => {
  beforeAll(() => {
    const { store } = configureStore({});
    globalStore = store;
    login();
  });
  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = componentWrapper();
    expect(firstChild).toMatchSnapshot();
  });
  it('show Error false', () => {
    props.showError = false;
    const { container } = componentWrapper();
    expect(container).toBeTruthy();
  });
});

describe('<PrivateRoute />', () => {
  beforeAll(() => {
    const { store } = configureStore({});
    globalStore = store;
    userExists.mockImplementation(() => true);
  });
  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = componentWrapper();
    expect(firstChild).toMatchSnapshot();
  });
});
