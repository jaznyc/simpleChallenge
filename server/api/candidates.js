
const { Candidate } = require('../db');
const { Company } = require('../db');
const router = require('express').Router();
module.exports = router;

router.get('/:candidateId', async (req, res, next) => {
  try {
    const singleCandidate = await Candidate.findOne({
      where: {
        candidate_id: req.params.candidateId,
      },
    });
    res.json(singleCandidate);
  } catch (err) {
    next(err);
  }
});


