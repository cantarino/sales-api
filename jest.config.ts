export default {
  clearMocks: true,

  collectCoverage: true,

  coverageDirectory: "coverage",

  coverageProvider: "v8",

  coverageReporters: ["text-summary", "lcov"],

  // moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
  //   prefix: "<rootDir>/",
  // }),

  preset: "ts-jest",

  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
};
