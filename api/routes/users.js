var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// router.get('/users/:id')
// router.get('/login')
// User provides user and pass from front end,
// we take that data and perform authentication

module.exports = router;
