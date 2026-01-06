module.exports = {
  testEnvironment: 'jsdom', // Simulate a browser environment
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest', // Use Babel for transforming JS/TSX
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Match Vite's `@` alias
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'], // Jest setup file
  transformIgnorePatterns: ['node_modules/(?!axios)/'],
};
