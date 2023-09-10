import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import App from '../index';
import configureStore from '../../../configureStore';
import { ROUTES } from '../../constants';
import StorageService from '../../../utils/StorageService';
import { TOKEN_KEY } from '../../../utils/constants';

let globalStore;
const componentWrapper = () =>
  render(
    <Provider store={globalStore}>
      <IntlProvider locale="en">
        <MemoryRouter initialEntries={[ROUTES.TEST_ADMIN_PAGE]}>
          <App />
        </MemoryRouter>
      </IntlProvider>
    </Provider>,
  );

describe('<App />', () => {
  beforeAll(() => {
    const { store } = configureStore({});
    globalStore = store;
    StorageService.set(TOKEN_KEY, 'TOKENVALUE');
  });
  it('should render Div', () => {
    const { container } = componentWrapper();
    const element = container.firstElementChild;
    expect(element.tagName).toEqual('DIV');
  });
});
