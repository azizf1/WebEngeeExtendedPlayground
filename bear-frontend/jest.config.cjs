module.exports = {
    preset: 'jest-preset-angular',
    transform: {
      '^.+\\.(ts|html|js)$': 'jest-preset-angular',
    },
    moduleFileExtensions: ['ts', 'html', 'js', 'json'],
    setupFilesAfterEnv: ['<rootDir>/setupJest.ts'],
    testEnvironment: 'jest-environment-jsdom',
    transformIgnorePatterns: [
      'node_modules/(?!@angular|rxjs|zone.js)',
    ],
    moduleNameMapper: {
        '\\.html$': '<rootDir>/jest-mocks.ts', 
        '\\.css$': '<rootDir>/jest-mocks.ts', 
      },
  };
  