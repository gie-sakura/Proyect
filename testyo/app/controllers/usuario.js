var express = require('express'),
  router = express.Router(),
  sqlite3 = require('sqlite3').verbose(),
  misqlite3= new sqlite3.Database('Angelica'),
  db = require('../models');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/usuario', function (req, res, next) {
  db.Article.findAll().then(function (usuarias) {
    res.render('usuario', {
      title: 'Hola Angelica estos son los usuarios',
      usuarios: usuarias
    });
  });
});

router.get('/usuario/creotabla', function (req, res, next) {
	misqlite3.run("DROP TABLE IF EXISTS usuarios");
	misqlite3.run("CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT, username NCHAR(55), password NCHAR(55), registerDate DATE)");
	console.log("La tabla usuarios ha sido correctamente creada");
  db.Article.findAll().then(function (usuarias) {
    res.render('usuario', {
      title: 'Hola Angelica estos son los usuarios',
      usuarios: usuarias
    });
  });
});