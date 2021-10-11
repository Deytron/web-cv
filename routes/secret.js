var express = require('express');
var bcrypt = require('bcrypt');
var mysql = require('mysql2')
var router = express.Router();
let error = false;

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
  .get(function (req, res, next) {
    if (req.session.loggedIn == true) {
      res.redirect('blog')
    } else {
      res.render('supersecretlogin', { title: "Barrez-vous", error: error })
    }
  })

  .post(function (req, res) {

    const email = req.body.email;
    const password = req.body.password;

    pooladmin.execute("SELECT id, email, password FROM admin WHERE email = ?", [email], function (err, result) {
      if (err) throw err;

      if (!result.length) {
        error = true;
      } else {
        const hashCompare = bcrypt.compareSync(password, result[0].password);

        if (hashCompare == true) {
          req.session.loggedIn = true;
          res.redirect('blog')
        } else {
          error = true;
        }
      }

      res.render('supersecretlogin', { title: "Barrez-vous", error: error })

    });
  });

module.exports = router;
