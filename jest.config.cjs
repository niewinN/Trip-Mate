module.exports = {
  preset: "ts-jest/presets/js-with-ts-esm", // ESM z TypeScript
  testEnvironment: "jest-environment-jsdom", // Środowisko DOM do testów React
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.app.json", // Ścieżka do pliku tsconfig
      useESM: true // Włącz obsługę ESM
    }
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"]
};
