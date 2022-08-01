import { defaults } from 'jest-config';

import type { Config } from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  verbose: true,
};
export default config;

module.exports = {
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  testRegex: '^.+\\.(spec|test)\\.(ts|js)$',
  testPathIgnorePatterns: ['.tmp/', '/node_modules/'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
};
