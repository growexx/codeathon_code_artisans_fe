import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import history from 'utils/history';
import configureStore from '../../configureStore';
const { store } = configureStore({});

const WrapperStory = props => (
  <Provider store={store}>
    <IntlProvider locale="en">
      <ConnectedRouter history={history}>{props.children}</ConnectedRouter>
    </IntlProvider>
  </Provider>
);

export default WrapperStory;

WrapperStory.propTypes = {
  children: PropTypes.element,
};
