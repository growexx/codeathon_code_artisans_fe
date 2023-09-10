import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { HistoryRouter as Router } from 'redux-first-history/rr6';
import Emitter from 'utils/events';
import { TOKEN_KEY, EMITTER_EVENTS } from 'utils/constants';
import StorageService from 'utils/StorageService';
import MainLayout from '../index';
import configureStore from '../../../configureStore';
import Layouts from '../Layout';

const { store, history } = configureStore({});
const tokenValue = 'test token';
const componentWrapper = props =>
  render(
    <Provider store={store}>
      <IntlProvider locale="en">
        <Router history={history}>
          <MainLayout {...props} />
        </Router>
      </IntlProvider>
    </Provider>,
  );

const login = () => StorageService.set(TOKEN_KEY, tokenValue);
const logout = () => StorageService.clear();

describe('<MainLayout />', () => {
  beforeAll(() => {
    login();
  });

  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = componentWrapper();
    expect(firstChild).toMatchSnapshot();
  });
  it('should render Div', () => {
    const { container } = componentWrapper();
    const element = container.firstElementChild;
    expect(element.tagName).toEqual('DIV');
  });
  it('should display MenuFoldOutlined icon', () => {
    const { getByTestId } = componentWrapper();
    const element = getByTestId('ToggleIcon');
    fireEvent.click(element);
    expect(element.tagName).toEqual('SPAN');
  });
  it('renders routes file without login', () => {
    logout();
    const { getByTestId } = componentWrapper();
    const element = getByTestId('AppRoutes');
    expect(element.tagName).toEqual('DIV');
  });
  it('emitter events', () => {
    const { container } = componentWrapper();
    Emitter.emit(EMITTER_EVENTS.LOG_IN);
    Emitter.emit(EMITTER_EVENTS.LOG_OUT);
    expect(container.firstChild.tagName).toEqual('DIV');
  });
});

describe('<Layout />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('layout variant default, sidebar collapsed', () => {
    render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <Router history={history}>
            <Layouts collapsed={false} />
          </Router>
        </IntlProvider>
      </Provider>,
    );
  });
  it('layout variant 2, sidebar collapsed', () => {
    render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <Router history={history}>
            <Layouts layoutVariant={2} collapsed />
          </Router>
        </IntlProvider>
      </Provider>,
    );
  });
  it('layout variant 2, sidebar not collapsed', () => {
    render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <Router history={history}>
            <Layouts layoutVariant={2} collapsed={false} />
          </Router>
        </IntlProvider>
      </Provider>,
    );
  });
  it('layout variant 3, sidebar collapsed', () => {
    render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <Router history={history}>
            <Layouts layoutVariant={3} collapsed />
          </Router>
        </IntlProvider>
      </Provider>,
    );
  });
});
