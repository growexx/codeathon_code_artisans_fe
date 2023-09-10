/**
 * Testing the NotFoundPage
 */

import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { HistoryRouter as Router } from 'redux-first-history/rr6';
import history from 'utils/history';
import { browserHistory } from 'react-router-dom';
import NotFound from '../index';
import configureStore from '../../../configureStore';

let globalStore;

const componentWrapper = () =>
  render(
    <Provider store={globalStore}>
      <IntlProvider locale="en">
        <Router history={history}>
          <NotFound />
        </Router>
      </IntlProvider>
    </Provider>,
  );
describe('<NotFound />', () => {
  beforeAll(() => {
    const { store } = configureStore({}, browserHistory);
    globalStore = store;
  });
  it('Should render without error', () => {
    componentWrapper();
  });
});
