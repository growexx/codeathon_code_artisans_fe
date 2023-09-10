import { selectChatHistory, selectData } from '../selectors';
describe('Chat Selectors Testing', () => {
  it('Testing selectChatHistory', () => {
    const mockState = {
      chatHistory: { '1': { question: 'question' } },
    };
    expect(selectChatHistory(mockState).resultFunc(mockState)).toEqual({
      '1': { question: 'question' },
    });
  });
  it('Testing selectData with initial state', () => {
    const mockState = {
      chatHistory: {},
    };
    expect(selectData(mockState)).toEqual({
      chatHistory: {},
    });
  });
});
