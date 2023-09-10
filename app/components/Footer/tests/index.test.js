import React from 'react';
import renderer from 'react-test-renderer';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import Footer from '../index';
import configureStore from '../../../configureStore';

describe('<Footer />', () => {
  let globalStore;

  beforeAll(() => {
    const { store } = configureStore({});
    globalStore = store;
  });

  it('should render and match the snapshot', () => {
    const renderedComponent = renderer
      .create(
        <Provider store={globalStore}>
          <IntlProvider locale="en">
            <Footer />
          </IntlProvider>
        </Provider>,
      )
      .toJSON();

    expect(renderedComponent).toMatchSnapshot();
  });
});
