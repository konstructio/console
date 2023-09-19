import { createRandomTwoCharacters } from '../createRandomTwoCharacters';

describe('utils/createRandomTwoCharacters', () => {
  it('creates two random characters', () => {
    const firstTest = createRandomTwoCharacters();
    const secondTest = createRandomTwoCharacters();

    console.log(firstTest);
    console.log(secondTest);

    expect(firstTest.length).toBe(2);
    expect(secondTest.length).toBe(2);
    expect(firstTest).not.toBe(secondTest);
  });
});
