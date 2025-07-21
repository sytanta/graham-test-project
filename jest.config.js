module.exports = {
    testEnvironment: 'node',
    roots: [
        '<rootDir>',
    ],
    testMatch: [
        '**/?(*.)+(spec|test).ts',
        '**/__tests__/**/*.ts',
    ],
    transform: {
        '^.+\\.ts$': [
            'ts-jest',
            {
                babel: true,
                tsConfig: 'tsconfig.test.json',
            },
        ],
    },
    setupFilesAfterEnv: [
        '<rootDir>/tests/setup.ts',
    ],
    collectCoverageFrom: [
        '**/*.ts',
        '**/*.d.ts',
        'server.ts',
    ],
    coverageDirectory: 'coverage',
    coverageReporters: [
        'text',
        'lcov',
        'html',
    ],
    moduleFileExtensions: [
        'js',
        'json',
        'node',
        'ts',
    ],
    testTimeout: 30000,
    verbose: true,
    forceExit: true,
    clearMocks: true,
    resetMocks: true,
    restoreMocks: true,
}
