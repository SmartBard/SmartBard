var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/admin', (req, res) => {
  res.status(200).json({ msg: 'Admin Page' })
})

router.get('/request', (req, res) => {
  res.status(200).json({ msg: 'Request Page' })
})

router.get('/priority', (req, res) => {
  res.status(200).json({ msg: 'Priority Page' })
})

// router.get('/admin')
//    router.post
//    router.patch
//    router.delete
// router.get('/request')
// router.get('/priority')
// router.get('/announcement/:id')

module.exports = router;
