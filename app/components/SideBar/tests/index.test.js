import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { HistoryRouter as Router } from 'redux-first-history/rr6';
import history from 'utils/history';
import request from 'utils/request';
import SideBar, { mapDispatchToProps } from '../index';
import configureStore from '../../../configureStore';
import { loadDataSuccess } from '../actions';
import 'jest-dom/extend-expect';

jest.mock('utils/request');
let globalStore;
const props = {
  user: {
    role: 1,
  },
  collapsed: true,
};
const componentWrapper = () =>
  render(
    <Provider store={globalStore}>
      <IntlProvider locale="en">
        <Router history={history}>
          <SideBar {...props} />
        </Router>
      </IntlProvider>
    </Provider>,
  );

describe('<SideBar />', () => {
  beforeAll(() => {
    const { store } = configureStore({});
    globalStore = store;
  });

  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = componentWrapper();
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
    returnValue.getSidebarItems(eventObject);
    returnValue.removeItem(eventObject);
    expect(mockFn).toBeCalled();
  });
  it('delete sidebar item', async () => {
    request.mockResolvedValueOnce({ status: 1 });
    globalStore.dispatch(
      loadDataSuccess([
        {
          chatId: '2e75',
          name: 'Question',
        },
      ]),
    );
    props.collapsed = false;
    const { getByText, getByTestId, queryByText } = componentWrapper();
    await waitFor(() => {
      expect(getByText('Question')).toBeInTheDocument();
    });
    fireEvent.click(getByText('Question'));
    await waitFor(() => {
      fireEvent.click(getByTestId('DELETE_SIDEBAR'));
      fireEvent.click(getByText('Delete'));
    });
    expect(queryByText('Question')).not.toBeInTheDocument();
  });
  it('donot delete sidebar item', async () => {
    request.mockResolvedValueOnce({ status: 1 });
    globalStore.dispatch(
      loadDataSuccess([
        {
          chatId: '2e75',
          name: 'Question',
        },
      ]),
    );
    const { getByText, getByTestId, queryByText } = componentWrapper();
    await waitFor(() => {
      expect(getByText('Question')).toBeInTheDocument();
    });
    fireEvent.click(getByText('Question'));
    await waitFor(() => {
      fireEvent.click(getByTestId('DELETE_SIDEBAR'));
      fireEvent.click(getByText('Cancel'));
    });
    expect(queryByText('Question')).toBeInTheDocument();
  });
  it('new chat', async () => {
    request.mockResolvedValueOnce({ status: 1 });
    globalStore.dispatch(
      loadDataSuccess([
        {
          chatId: '2e75',
          name: 'Question',
        },
      ]),
    );
    const { getByText, getByTestId, queryByText } = componentWrapper();
    await waitFor(() => {
      expect(getByText('Question')).toBeInTheDocument();
    });
    fireEvent.click(getByTestId('SIDEBAR_TOGGLE'));
    fireEvent.click(getByText('New Chat'));
    expect(queryByText('Question')).toBeInTheDocument();
  });
});
