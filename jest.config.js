module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: false,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: [
    'packages/**/src/**/*.{ts,tsx}',
    '!packages/**/*.stories.{ts,tsx,md,mdx}',
    '!packages/**/*.test.{ts,tsx}',
    '!packages/**/*.spec.{ts,tsx}'
  ],

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  // An object that configures minimum threshold enforcement for coverage results
  coverageThreshold: {
    // jest will fail if there is less than 80% branch, line, and function coverage, or if there are more than 10 uncovered statements
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10
    }
  },

  // Make calling deprecated APIs throw helpful error messages
  errorOnDeprecated: true,

  // An array of file extensions your modules use
  moduleFileExtensions: ['js', 'ts', 'tsx'],

  // An array of regexp pattern strings, matched against all module paths before considered 'visible' to the module loader
  modulePathIgnorePatterns: ['<rootDir>/build'],

  // Automatically reset mock state between every test
  resetMocks: true,

  // A list of paths to modules that run some code to configure or set up the testing framework before each test file in the suite is executed
  setupFilesAfterEnv: ['./jest.setup.js'],

  // A list of paths to directories that Jest should use to search for files in
  roots: ['<rootDir>/packages'],

  // The test environment that will be used for testing
  testEnvironment: 'jest-environment-jsdom',

  // The regexp pattern or array of patterns that Jest uses to detect test files
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(tsx|ts)$',

  moduleNameMapper: {
    '^styled-components$': '<rootDir>/node_modules/styled-components',
    '^react$': '<rootDir>/node_modules/react'
  }
};
