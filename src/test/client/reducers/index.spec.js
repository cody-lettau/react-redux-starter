import { expect } from 'chai';
import reducer from '../../../client/reducers/index';

/*
 * This is just a placeholder test -- really don't need to test
 * the functionality of redux combining reducers
 */
describe('Client View: Reducer > Index (App)', () => {
  it('combined reducer exists', () => {
    expect(reducer).to.exist();
  });
});
