import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { HistoryRouter as Router } from 'redux-first-history/rr6';
import history from 'utils/history';
import { userExists } from 'utils/Helper';
import Login from 'containers/Auth/Login/Loadable';
import configureStore from '../../../configureStore';
import AuthRoute from '../AuthRoute';
jest.mock('utils/Helper');
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  Navigate: jest.fn(() => <div data-testid="navigate" />),
}));

const props = {
  component: Login,
};
let globalStore;
const componentWrapper = () =>
  render(
    <Provider store={globalStore}>
      <IntlProvider locale="en">
        <Router history={history}>
          <AuthRoute {...props} />
        </Router>
      </IntlProvider>
    </Provider>,
  );

describe('<MainLayout />', () => {
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
  it('with login', () => {
    const { container } = componentWrapper();
    expect(container.tagName).toBe('DIV');
  });
  it('with logout', () => {
    userExists.mockImplementation(() => false);
    const { container } = componentWrapper();
    expect(container.tagName).toBe('DIV');
  });
});
