var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'testyo'
    },
    port: 3000,
    db: 'sqlite://localhost/testyo-development',
    storage: rootPath + '/data/testyo-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'testyo'
    },
    port: 3000,
    db: 'sqlite://localhost/testyo-test',
    storage: rootPath + '/data/testyo-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'testyo'
    },
    port: 3000,
    db: 'sqlite://localhost/testyo-production',
    storage: rootPath + 'data/testyo-production'
  }
};

module.exports = config[env];
