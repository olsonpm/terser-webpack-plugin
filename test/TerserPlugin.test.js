import TerserPlugin from '../src/index';

describe('TerserPlugin', () => {
  it('has apply function', () => {
    expect(typeof new TerserPlugin().apply).toBe('function');
  });
});
