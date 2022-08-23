import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  testEnvironment: 'jsdom',
  preset: 'ts-jest',
  moduleFileExtensions: ['js', 'json', 'tsx', 'ts'],
  setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.ts'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  coveragePathIgnorePatterns: ['/node_modules/', '/tests/', '/assets/', './jest.config.ts'],
  collectCoverageFrom: ['**/*.{ts,tsx}', '!**/*.d.{ts,tsx}'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(jpg|jpeg|png|gif|svg|css)$': '<rootDir>/tests/file-mock.ts',
  },
  moduleNameMapper: {
    'tests/(.*)': '<rootDir>/tests/$1',
  },
};

export default config;
