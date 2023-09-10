import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import history from 'utils/history';
import { HistoryRouter as Router } from 'redux-first-history/rr6';
import { Login, mapDispatchToProps } from '../index';
import Lodable from '../Loadable';
import configureStore from '../../../../configureStore';
let globalStore;
const props = {
  error: true,
};
const componentWrapper = Component =>
  render(
    <Provider store={globalStore}>
      <IntlProvider locale="en">
        <Router history={history}>
          <Component {...props} />
        </Router>
      </IntlProvider>
    </Provider>,
  );
describe('<Login />', () => {
  beforeAll(() => {
    const { store } = configureStore({});
    globalStore = store;
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = componentWrapper(Login);
    expect(firstChild).toMatchSnapshot();
  });
  it('mapDispatch to props', () => {
    const mockFn = jest.fn();
    const eventObject = {
      target: {
        value: 'test',
      },
      preventDefault: jest.fn(),
    };
    const returnValue = mapDispatchToProps(mockFn);
    returnValue.onChangeEmail(eventObject);
    returnValue.onChangePassword(eventObject);
    returnValue.onSignIn(eventObject);
    const eventObjectWithoutPreventDefault = {
      target: {
        value: 'test',
      },
    };
    returnValue.onSignIn(eventObjectWithoutPreventDefault);
    expect(mockFn).toBeCalled();
  });
  it('Should render and match the snapshot Loadable', () => {
    const {
      container: { firstChild },
    } = componentWrapper(Lodable);
    expect(firstChild).toMatchSnapshot();
  });
});
