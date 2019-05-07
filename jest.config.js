module.exports = {
  transform : {
    '^.+\\.jsx$' : 'babel-jest',
    '^.+\\.js$'  : 'babel-jest'
  },
  automock : false,
  globals  : {
    'env' : {
      'isProd'  : false,
      'isDev'   : true,
      'command' : 'start'
    }
  },
  moduleNameMapper : {
    '^.*[.](css|CSS)$'    : '<rootDir>/__tests__/setup/styleMock.js',
    '^[$]TEST_UTILS(.*)$' : '<rootDir>/__tests__/utils',
    '^[$]SRC(.*)$'        : '<rootDir>/src',
    '^[$]BUILD(.*)$'      : '<rootDir>/build',
    '^[$]UTILS(.*)$'      : '<rootDir>/src/utils$1',
    '^[$]CONFIG(.*)$'     : '<rootDir>/src/config',
    '^[$]COMPONENTS(.*)$' : '<rootDir>/src/components',
    '^[$]DEMOS(.*)$'      : '<rootDir>/src/components/demos'
  },
  moduleFileExtensions : [
    'js',
    'jsx',
    'json',
    'css'
  ],
  verbose    : true,
  setupFiles : [
    '<rootDir>/__tests__/setup/setupJest.js'
  ],
  setupTestFrameworkScriptFile : '<rootDir>/__tests__/setup/setupTests.js',
  testPathIgnorePatterns       : [
    '<rootDir>/__tests__'
  ],
}

