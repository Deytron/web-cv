var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  req.session.loggedIn = false;
  res.redirect('blog')
})

module.exports = router;
