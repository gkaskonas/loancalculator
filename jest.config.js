const { compilerOptions } = require("./tsconfig.json");

module.exports = {
  preset: "ts-jest",
  roots: ["<rootDir>/src"],
  testEnvironment: "node",
};
