var express = require('express');
var mysql = require('mysql2');
var multer = require('multer')
var router = express.Router();

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'article_img/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.png')
  },
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== '.png') {
      return callback(new Error('Seules les images sont autorisées !'))
    }
    callback(null, true)
  },
  limits: {
    fileSize: 2048 * 2048
  }
});

var upload = multer({ storage: storage })
var files = upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'illustration', maxCount: 1 }])

// MYSQL POOL
const pooladmin = mysql.createPool({
  host: 'localhost',
  user: 'admin',
  password: 'GrosseBiteSeche999',
  database: 'blog',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

router.route('/')
  .get(function (req, res) {
    if (req.session.loggedIn == false || !req.session.loggedIn) {
      res.redirect('blog')
    } else {
    res.render('insert', { title: "Ajouter un article" })
    }
  })


  .post(files, function (req, res) {
    var item1 = Object.values(req.files)[0];
    var item2 = Object.values(req.files)[1];
    if (req.body.titre.length > 50 || req.body.preview.length > 250 || req.body.tags.length > 250) {
      error = true;
      res.render('insert', { error: error })
    } else {
      pooladmin.execute("INSERT INTO articles (title, preview, tags, thumbnail, illustration, content, creation_date) VALUES (?, ?, ?, ?, ?, ?, NOW())",
        [req.body.titre, req.body.preview, req.body.tags, Object.values(item1[0])[5], Object.values(item2[0])[5], req.body.contenu], function (err, rows, fields) {
          if (err) throw err;

        });

      res.redirect('blog');
    }
  });

module.exports = router;
