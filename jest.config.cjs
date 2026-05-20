module.exports = {
  displayName: 'dt-advisory-web',
  moduleDirectories: ['node_modules'],
  modulePaths: [],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^(?!.*\\.(css|json)$)': '<rootDir>/jest/fileTransform.cjs',
  },
  coveragePathIgnorePatterns: ['/node_modules/'],
  transformIgnorePatterns: ['node_modules'],
  testPathIgnorePatterns: ['__.*'],
  moduleNameMapper: {
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/jest/imageTransform.cjs',
    '\\.svg(\\?react)?$': '<rootDir>/jest/svgrMock.js',
    '/^axios$/': 'axios/dist/node/axios.cjs',
    '^@dt-advisory/(.*)(?!.*svg.*)$': '<rootDir>/src/$1',
    'tailwind.config.ts': '<rootDir>/tailwind.config.ts',
    '^.+\\.css$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^nanoid$': require.resolve('nanoid'),
    '^react$': require.resolve('react'),
    '^react-router-dom$': require.resolve('react-router-dom'),
  },
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}',
  ],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',

    // ignore the App.tsx and index.tsx
    '!<rootDir>/src/index.tsx',
    '!<rootDir>/src/App.tsx',
    // ignore index.ts
    '!<rootDir>/src/**/index.ts',
    // ignore all styles and types
    '!<rootDir>/src/**/*.{types,style}.{ts,tsx}',
    // root of the pages, it's integration test, we can ignore it.
    '!<rootDir>/src/pages/*/*.{ts,tsx}',
    // ignore test and type helpers
    '!<rootDir>/src/helpers/{types,tests}/**/*.{ts,tsx}',
  ],
  testEnvironment: 'jsdom',
};
