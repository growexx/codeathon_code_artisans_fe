import Emitter from 'utils/events';
describe('Emitter', () => {
  test('Emitter events', () => {
    const mockFn = jest.fn();
    const eventObject = { event: 'test' };
    Emitter.on(eventObject, mockFn);
    Emitter.on(eventObject, mockFn);
    Emitter.once(eventObject, mockFn);
    Emitter.off(eventObject, mockFn);
    Emitter.emit(eventObject, mockFn);
    expect(eventObject.event).toEqual('test');
  });
});
