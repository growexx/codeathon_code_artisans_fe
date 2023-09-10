/**
 * Testing the UnauthorizedPage
 */

import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import history from 'utils/history';
import { HistoryRouter as Router } from 'redux-first-history/rr6';
import Unauthorized from '../index';
import configureStore from '../../../configureStore';
let globalStore;

const componentWrapper = () =>
  render(
    <Provider store={globalStore}>
      <IntlProvider locale="en">
        <Router history={history}>
          <Unauthorized />
        </Router>
      </IntlProvider>
    </Provider>,
  );

describe('<Unauthorized />', () => {
  beforeAll(() => {
    const { store } = configureStore({});
    globalStore = store;
  });
  it('Should render without error', () => {
    componentWrapper();
  });
});
