var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:user_id', function (req, res, next) {
  res.send({
    result: [{ user_name: "lee", user_age: 27 }],
    message: "good"
  })
});

module.exports = router;
