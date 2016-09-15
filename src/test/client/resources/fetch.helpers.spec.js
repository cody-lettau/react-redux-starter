/* eslint-disable no-native-reassign */
import casual from 'casual';
import { expect } from 'chai';
import sinon from 'sinon';
import * as fetchHelpers from '../../../client/resources/fetch.helpers';

describe('Resources: fetch.helpers.js', () => {
  describe('.checkStatus', () => {
    describe('success status', () => {
      it('returns the response object', () => {
        const res = {
          status: 200,
          statusText: casual.string,
          data: {},
        };

        const returnedRes = fetchHelpers.checkStatus(res);
        expect(returnedRes).to.deep.equal(res);
      });
    });

    describe('error status (status < 200 || status >= 300)', () => {
      it('returns an error', () => {
        const res = {
          status: 400,
          statusText: casual.string,
          error: casual.string,
        };

        const expectedError = res.statusText;

        expect(() => { fetchHelpers.checkStatus(res); }).to.throw(expectedError);
      });
    });

    describe('array response', () => {
      it('returns map of success statuses', () => {
        const res1 = {
          status: 200,
          statusText: casual.string,
          data: {},
        };
        const res2 = {
          status: 200,
          statusText: casual.string,
          data: {},
        };
        const resArray = [res1, res2];

        const returnedRes = fetchHelpers.checkStatus(resArray);
        expect(returnedRes).to.deep.equal(resArray);
      });

      it('array with array returns map of success statuses', () => {
        const res1 = {
          status: 200,
          statusText: casual.string,
          data: {},
        };
        const res2a = {
          status: 200,
          statusText: casual.string,
          data: {},
        };
        const res2b = {
          status: 200,
          statusText: casual.string,
          data: {},
        };
        const resArray = [res1, [res2a, res2b]];

        const returnedRes = fetchHelpers.checkStatus(resArray);
        expect(returnedRes).to.deep.equal(resArray);
      });
    });
  });

  describe('.inDebugMode', () => {
    describe('url param debug=true set', () => {
      beforeEach(() => {
        location = {
          search: `#${casual.word}?debug=true`,
        };
      });

      it('returns true (use dummy data)', () => {
        const inDebugMode = fetchHelpers.inDebugMode();

        expect(inDebugMode).to.be.true();
      });
    });

    describe('url param debug=true not set', () => {
      beforeEach(() => {
        location = {
          search: `#${casual.word}`,
        };
      });

      it('returns false (don\'use dummy data)', () => {
        const inDebugMode = fetchHelpers.inDebugMode();

        expect(inDebugMode).to.be.false();
      });
    });
  });

  describe('.host', () => {
    beforeEach(() => {
      location = {
        origin: casual.ip,
      };
    });

    it('returns location.origin value', () => {
      const host = fetchHelpers.host();

      expect(host).to.equal(location.origin);
    });
  });

  describe('.allPromisesSettled', () => {
    let p1, p2;

    beforeEach(() => {
      p1 = sinon.stub().returnsPromise();
      p2 = sinon.stub().returnsPromise();
    });

    afterEach(() => {

    });

    it('correctly sets state to fulfilled', (done) => {
      const expVal = casual.word;
      p1.resolves(expVal);

      fetchHelpers.allPromisesSettled([p1()])
        .then((results) => {
          expect(results.length).to.equal(1);
          const retResponse = results[0];

          expect(retResponse.state).to.equal('fulfilled');
          expect(retResponse.value).to.equal(expVal);
          done();
        });
    });

    it('correctly sets state to rejected', (done) => {
      const expError = casual.word;
      p1.rejects(expError);

      fetchHelpers.allPromisesSettled([p1()])
        .then((results) => {
          expect(results.length).to.equal(1);
          const retResponse = results[0];

          expect(retResponse.state).to.equal('rejected');
          expect(retResponse.reason).to.equal(expError);
          done();
        });
    });

    it('handles 2 or more promises', (done) => {
      const expVal = casual.word;
      const expVal2 = casual.word;
      p1.resolves(expVal);
      p2.resolves(expVal2);

      fetchHelpers.allPromisesSettled([p1(), p2()])
        .then((results) => {
          expect(results.length).to.equal(2);
          const retResponse1 = results[0];
          const retResponse2 = results[1];

          expect(retResponse1.state).to.equal('fulfilled');
          expect(retResponse1.value).to.equal(expVal);
          expect(retResponse2.state).to.equal('fulfilled');
          expect(retResponse2.value).to.equal(expVal2);
          done();
        });
    })
  });

  describe('.parseAllSettledResponse', () => {
    it('returns array of values from responses', () => {
      const values = [ casual.random, casual.random ];
      const responses = [
        { state: 'fulfilled', value: values[0] },
        { state: 'fulfilled', value: values[1] },
      ];

      const parsed = fetchHelpers.parseAllSettledResponse(responses);
      expect(parsed).to.deep.equal(values);
    });

    it('handles non-fulfilled responses', () => {
      const values = [ casual.random, casual.random ];
      const responses = [
        { state: 'fulfilled', value: values[0] },
        { state: 'fulfilled', value: values[1] },
        { state: 'rejected', reason: 'error msg' },
      ];

      const parsed = fetchHelpers.parseAllSettledResponse(responses);
      expect(parsed).to.deep.equal(values);
    });

    it('handles missing values on responses', () => {
      const values = [ casual.random, casual.random ];
      const responses = [
        { state: 'fulfilled', value: values[0] },
        { state: 'fulfilled', value: values[1] },
        { state: 'fulfilled' },
      ];

      const parsed = fetchHelpers.parseAllSettledResponse(responses);
      expect(parsed).to.deep.equal(values);
    });

    it('handles empty array of responses', () => {
      const responses = [];

      const parsed = fetchHelpers.parseAllSettledResponse(responses);
      expect(parsed).to.deep.equal([]);
    });
  });
});
