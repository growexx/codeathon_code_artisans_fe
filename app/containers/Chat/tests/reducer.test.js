import * as types from '../constants';
import reducer, { initialState } from '../reducer';
const getFormJsStateInstance = config =>
  Object.assign(
    {
      chatHistory: {},
    },
    config,
  );
describe('chat reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  it('should handle ADD_CHAT_QUESTION', () => {
    expect(
      reducer(initialState, {
        type: types.ADD_CHAT_QUESTION,
        chatId: '1',
        question: 'question',
      }),
    ).toEqual(
      getFormJsStateInstance({
        chatHistory: { '1': [{ question: 'question' }] },
      }),
    );
    expect(
      reducer(
        {
          chatHistory: { '1': [{ question: 'question' }] },
        },
        {
          type: types.ADD_CHAT_QUESTION,
          chatId: '1',
          question: 'question',
        },
      ),
    ).toEqual(
      getFormJsStateInstance({
        chatHistory: {
          '1': [{ question: 'question' }, { question: 'question' }],
        },
      }),
    );
  });
  it('should handle ADD_CHAT_ANSWER', () => {
    expect(
      reducer(
        {
          chatHistory: { '1': [{ question: 'question' }] },
        },
        {
          type: types.ADD_CHAT_ANSWER,
          chatId: '1',
          answer: 'answer',
          sources: [],
        },
      ),
    ).toEqual(
      getFormJsStateInstance({
        chatHistory: {
          '1': [{ question: 'question', answer: 'answer', sources: [] }],
        },
      }),
    );
  });
  it('should handle SET_CHAT_HISTORY', () => {
    expect(
      reducer(initialState, {
        type: types.SET_CHAT_HISTORY,
        chatId: '1',
        history: [],
      }),
    ).toEqual(
      getFormJsStateInstance({
        chatHistory: {
          '1': [],
        },
      }),
    );
  });
});
