var express = require('express');
var dateFormat = require("dateformat");
var mysql = require('mysql2')
var router = express.Router();
var articlesList = [];
var unarticle = {};

// MYSQL POOL
const pooluser = mysql.createPool({
  host: 'localhost',
  user: 'user',
  password: 'GrandeBiteNoire99',
  database: 'blog',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

router.route('/')
  .get(function (req, res, next) {

    if (req.session.loggedIn == false || !req.session.loggedIn) {
      connected = false;
    } else {
      connected = true;
    }

    pooluser.execute('SELECT * FROM articles', function (err, rows, fields) {
      if (err) throw err;

      articlesList = []
      for (var i = 0; i < rows.length; i++) {
        var article = {
          'id': rows[i]['id'],
          'title': rows[i]['title'],
          'thumbnail': rows[i]['thumbnail'],
          'illustration': rows[i]['illustration'],
          'creation_date': 'Créé le ' + dateFormat(rows[i]['creation_date'], "dd/mm/yy"),
          'content': rows[i]['content'],
          'preview': rows[i]['preview'],
          'tags': rows[i]['tags']
        }
        articlesList.push(article);
      }
    });
    res.render('blog', { title: "Blog", articlesList, connected: connected });
  })

router.get('/:articleId', function (req, res, next) {

  pooluser.execute("SELECT * FROM articles WHERE id = ?", [req.params.articleId], function (err, rows, fields) {
    if (err) throw err;


    for (var i = 0; i < rows.length; i++) {
      unarticle = {
        'title': rows[i]['title'],
        'tags': rows[i]['tags'],
        'creation_date': 'Créé le ' + dateFormat(rows[i]['creation_date'], "dd/mm/yy"),
        // 'last_modified': 'Dernière modification : ' + dateFormat(rows[i]['last_modified'], "dd/mm/yy"),
        'illustration': rows[i]['illustration'],
        'content': rows[i]['content']
      }
      if (unarticle['last_modified'] == '0000-00-00 00:00:00') {
        unarticle['last_modified'] = 'Aucune'
      }
    }
  });
  res.render('article', { title: unarticle['title'], unarticle });
});



module.exports = router;
