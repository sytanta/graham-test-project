/** @type {import('jest').Config} */
const config = {
    // Specify the test environment as 'node' for server-side applications
    testEnvironment: 'node',

    // Define where Jest should look for test files
    roots: ['<rootDir>'],

    // Specify the glob patterns Jest uses to detect test files
    testMatch: [
        '**/__tests__/**/*.ts',
        '**/?(*.)+(spec|test).ts',
    ],

    transform: {
        '^.+\\.ts$': 'ts-jest',
    },

    // Configure ts-jest options (optional)
    globals: {
        'ts-jest': {
            // Specify the tsconfig.json file to use
            tsconfig: 'tsconfig.test.json',
        },
    },

    // Optional: Setup files to run before tests
    setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.ts'],

    collectCoverageFrom: [
        '**/*.ts',
        '**/*.d.ts',
        'server.ts',
    ],
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov', 'html'],
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
    testTimeout: 30000,
    verbose: true,
    forceExit: true,
    clearMocks: true,
    resetMocks: true,
    restoreMocks: true,
};

module.exports = config;
