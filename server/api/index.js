const router = require('express').Router();
module.exports = router;

router.use('/candidates', require('./candidates'))


router.use(function (req, res, next){
  const err = new Error('Not Found.')
  err.status = 404;
  next(err)
})


