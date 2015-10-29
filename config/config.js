var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'proyecto'
    },
    port: 8001,
    db: 'sqlite://localhost/proyecto-development',
    storage: rootPath + '/data/proyecto-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'proyecto'
    },
    port: 8001,
    db: 'sqlite://localhost/proyecto-test',
    storage: rootPath + '/data/proyecto-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'proyecto'
    },
    port: 3000,
    db: 'sqlite://localhost/proyecto-production',
    storage: rootPath + 'data/proyecto-production'
  }
};


module.exports = config[env];
