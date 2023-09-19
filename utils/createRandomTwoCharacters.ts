import { randomUUID } from 'crypto';

export function createRandomTwoCharacters(): string {
  return randomUUID().toLowerCase().slice(0, 2);
}
