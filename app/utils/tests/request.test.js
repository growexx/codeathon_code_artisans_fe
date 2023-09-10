/**
 * Test the request function
 */

import 'whatwg-fetch';
import { TOKEN_KEY } from '../constants';
import request from '../request';
import StorageService from '../StorageService';

describe('request', () => {
  // Before each test, stub the fetch function
  beforeEach(() => {
    window.fetch = jest.fn();
  });

  describe('stubbing successful response', () => {
    // Before each test, pretend we got a successful response
    beforeEach(() => {
      const res = new Response('{"hello":"world"}', {
        status: 200,
        headers: {
          'Content-type': 'application/json',
        },
      });

      window.fetch.mockReturnValue(Promise.resolve(res));
    });

    it('should format the response correctly', done => {
      StorageService.set(TOKEN_KEY, 'TESTTOKEN');
      request('/thisurliscorrect', {
        method: 'GET',
        body: {},
        headers: {},
        data: {},
      })
        .catch(done)
        .then(json => {
          expect(json.hello).toBe('world');
          done();
        });
    });
    it('should format the response correctly with user not exists', done => {
      StorageService.clear();
      request('/thisurliscorrect', {
        method: 'GET',
        body: {},
        headers: {},
        data: {},
      })
        .catch(done)
        .then(json => {
          expect(json.hello).toBe('world');
          done();
        });
    });
  });

  describe('stubbing 204 response', () => {
    // Before each test, pretend we got a successful response
    beforeEach(() => {
      const res = new Response('', {
        status: 204,
        statusText: 'No Content',
      });

      window.fetch.mockReturnValue(Promise.resolve(res));
    });

    it('should return null on 204 response', done => {
      request('/thisurliscorrect', {
        method: 'GET',
      })
        .catch(done)
        .then(json => {
          expect(json).toBeNull();
          done();
        });
    });
  });

  describe('stubbing error response', () => {
    // Before each test, pretend we got an unsuccessful response
    beforeEach(() => {
      const res = new Response('', {
        status: 404,
        statusText: 'Not Found',
        headers: {
          'Content-type': 'application/json',
        },
      });

      window.fetch.mockReturnValue(Promise.resolve(res));
    });

    it('should catch errors', done => {
      request('/thisdoesntexist', { method: 'GET' }).catch(err => {
        expect(err.response.status).toBe(404);
        expect(err.response.statusText).toBe('Not Found');
        done();
      });
    });
  });
});
