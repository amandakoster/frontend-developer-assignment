module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverage: true, // Enable coverage collection
  coverageDirectory: 'coverage', // Specify the directory to output coverage reports
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}', // Specify which files to collect coverage from
    '!src/**/*.d.ts', // Exclude TypeScript declaration files
  ],
};
