import React from 'react';
import { useParams } from 'react-router-dom';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import history from 'utils/history';
import request from 'utils/request';
import { HistoryRouter as Router } from 'redux-first-history/rr6';
import Chat, { getSources, mapDispatchToProps } from '../index';
import configureStore from '../../../configureStore';
import { setChatHistory } from '../actions';
import 'jest-dom/extend-expect';

jest.mock('components/ChatItem');
jest.mock('utils/request');
jest.mock('react-router-dom', () => ({
  useParams: jest.fn(() => ({ chatId: '1' })),
  useLocation: jest.fn(() => ({ pathname: 'chat/1' })),
  useNavigate: jest.fn(() => () => {}),
}));

let globalStore;
const props = {
  isNew: false,
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
describe('<Chat />', () => {
  beforeAll(() => {
    const { store } = configureStore({});
    globalStore = store;
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = componentWrapper(Chat);
    expect(firstChild).toMatchSnapshot();
  });
  it('get sources function', () => {
    expect(getSources(['abc/test.pdf', 'xyz/test.pdf'])).toStrictEqual([
      'test.pdf',
    ]);
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
    returnValue.addChatQue(eventObject);
    returnValue.addChatAns(eventObject);
    returnValue.setHistory(eventObject);
    returnValue.addNewSidebar(eventObject);
    expect(mockFn).toBeCalled();
  });
  it('type question and submit by enter key', async () => {
    useParams.mockResolvedValueOnce(undefined);
    request.mockResolvedValueOnce({
      status: 1,
      data: {
        question: 'question',
        answer: 'answer',
        sources: ['123.pdf'],
        chat_history: [
          { question: 'question', answer: 'answer', sources: ['123.pdf'] },
        ],
      },
    });
    const { getByPlaceholderText } = componentWrapper(Chat);
    await waitFor(() => {
      fireEvent.change(getByPlaceholderText('Send a message'), {
        target: { value: '' },
      });
      fireEvent.keyDown(getByPlaceholderText('Send a message'), {
        key: 'Enter',
        keyCode: 13,
      });
    });
  });
  it('type question and not submit by shift + enter key', async () => {
    useParams.mockResolvedValueOnce(1);
    request.mockResolvedValueOnce({
      status: 0,
    });
    const { getByPlaceholderText } = componentWrapper(Chat);
    await waitFor(() => {
      fireEvent.change(getByPlaceholderText('Send a message'), {
        target: { value: '' },
      });
      fireEvent.keyDown(getByPlaceholderText('Send a message'), {
        key: 'shift',
        keyCode: 16,
      });
      fireEvent.keyDown(getByPlaceholderText('Send a message'), {
        key: 'enter',
        keyCode: 13,
      });
    });
  });
  it('type question and submit by button click', async () => {
    useParams.mockResolvedValueOnce(1);
    const { getByPlaceholderText, getByTestId } = componentWrapper(Chat);
    await waitFor(() => {
      fireEvent.change(getByPlaceholderText('Send a message'), {
        target: { value: '' },
      });
      fireEvent.click(getByTestId('SEND_CHAT_BTN'));
    });
  });
  it('ask question and show answer', async () => {
    useParams.mockResolvedValueOnce(1);
    const { getByPlaceholderText, getByTestId } = componentWrapper(Chat);
    await waitFor(() => {
      fireEvent.change(getByPlaceholderText('Send a message'), {
        target: { value: '' },
      });
      fireEvent.click(getByTestId('SEND_CHAT_BTN'));
    });
  });
  it('show chat history', () => {
    document.getElementById = jest.fn(() => ({
      scrollHeight: 0,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));
    globalStore.dispatch(
      setChatHistory(1, [
        { question: 'question', answer: 'answer', sources: [] },
      ]),
    );
    componentWrapper(Chat);
  });
  it('new chat', async () => {
    props.isNew = true;
    request.mockResolvedValueOnce({
      status: 1,
      data: {
        question: 'question',
        answer: 'answer',
        sources: ['123.pdf'],
        chat_history: [
          { question: 'question', answer: 'answer', sources: ['123.pdf'] },
        ],
      },
    });
    request.mockResolvedValueOnce({
      status: 1,
      data: { answer: 'answer', sources: [] },
    });
    const { getAllByTestId, getByPlaceholderText } = componentWrapper(Chat);
    fireEvent.change(getByPlaceholderText('Send a message'), {
      target: { value: '' },
    });
    fireEvent.click(getAllByTestId('SUGG_BTN')[0]);
  });
  it('new chat and clicking suggestions', async () => {
    props.isNew = true;
    request.mockResolvedValueOnce({
      status: 1,
      data: {
        question: 'question',
        answer: 'answer',
        sources: ['123.pdf'],
        chat_history: [
          { question: 'question', answer: 'answer', sources: ['123.pdf'] },
        ],
      },
    });
    request.mockResolvedValueOnce({
      status: 1,
      data: { answer: 'answer', sources: [] },
    });
    const { getAllByTestId, getByPlaceholderText } = componentWrapper(Chat);
    fireEvent.change(getByPlaceholderText('Send a message'), {
      target: { value: 'a' },
    });
    fireEvent.click(getAllByTestId('SUGG_BTN')[3]);
  });
});
