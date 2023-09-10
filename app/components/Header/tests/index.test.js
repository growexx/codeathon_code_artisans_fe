import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { HistoryRouter as Router } from 'redux-first-history/rr6';
import Header from '../index';
import { StyledAppHeader } from '../StyledAppHeader';
import configureStore from '../../../configureStore';

describe('<Header />', () => {
  const { store, history } = configureStore({}, history);

  it('should render a div', () => {
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <Router history={history}>
            <Header />
          </Router>
        </IntlProvider>
      </Provider>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render a div with props', () => {
    render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <Router history={history}>
            <Header menuBackground />
          </Router>
        </IntlProvider>
      </Provider>,
    );
  });

  it('should render a div with props', () => {
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <Router history={history}>
            <StyledAppHeader menuBackground />
          </Router>
        </IntlProvider>
      </Provider>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render a div with props', () => {
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <Router history={history}>
            <StyledAppHeader />
          </Router>
        </IntlProvider>
      </Provider>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
