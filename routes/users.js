var express = require('express');
var router = express.Router();
const { createUser } = require('../controller/test');
const Users = require('../models/users');
/* GET users listing. */
router.get('/',async function(req, res, next) {
  let data = new Users({
    name : 'from docker',
    Pstatus : true
  });
  await createUser(data);
  res.send('respond with a resource');
});

module.exports = router;
