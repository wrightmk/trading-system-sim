/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  clearMocks: true,
  moduleFileExtensions: ["js", "ts"],
  roots: ["<rootDir>/src"],
  testEnvironment: "node",
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  globals: {
    "ts-jest": {
      diagnostics: false,
    },
  },
  preset: "ts-jest",
  testMatch: ["<rootDir>/src/**/*.test.ts", "<rootDir>/src/**/*.test.tsx"],
  globalTeardown: "<rootDir>/src/__tests__/setup/globalTeardown.ts",
  globalSetup: "<rootDir>/src/__tests__/setup/globalSetup.ts",
};
