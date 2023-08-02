/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable @typescript-eslint/quotes */
// eslint-disable-next-line @typescript-eslint/quotes
import type { Config } from "jest";

const config: Config = {
  roots: ["<rootDir>/src"],
  clearMocks: true,
  collectCoverageFrom: ["<rootDir>/src"],
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  transform: {
    ".+\\.ts$": "ts-jest",
  },
};

export default config;
