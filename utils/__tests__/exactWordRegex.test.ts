import { exactWordRegex } from '../exactWordRegex';

describe('utils/exactWordRegex', () => {
  it('will return a regex that will look for the exact string passed in', () => {
    const domainOne = 'freegitopsmagic.com';
    const domainTwo = 'gitopsmagic.com';
    const domainThree = 'FreeGitOpsMagic.com';

    const domainOneExactRegex = exactWordRegex(domainOne);
    expect(domainOneExactRegex.test(domainTwo)).toBeFalsy();
    expect(domainOneExactRegex.test(domainThree)).toBeFalsy();
    expect(domainOneExactRegex.test(domainOne)).toBeTruthy();
  });
});
