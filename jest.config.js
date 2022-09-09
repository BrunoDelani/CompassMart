/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    '**/__tests__/**/*.test.ts?(x)'
  ],
  collectCoverage: true,
  coverageDirectory: '__tests__/coverage',
  collectCoverageFrom: [
    'src/**',
    '!src/utils/**',
    '!src/docs/**',
    '!src/config/**',
    '!src/errors/**',
    '!src/api/mapper/**'
  ]
};
