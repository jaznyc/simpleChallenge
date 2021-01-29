
const { Candidate } = require('../db');
const { Company } = require('../db');
const Sequelize = require('sequelize')
const router = require('express').Router();
module.exports = router;

router.get('/:candidateId', async (req, res, next) => {
  try {
    console.log("hit")
    const singleCandidate = await Candidate.findOne({
      where: {
        candidate_id: req.params.candidateId,
      },
      include: [
      {model: Company,
      on: {
        col1: Sequelize.where(Sequelize.col("candidate.company_id"), "=", Sequelize.col("company.company_id"))
      }}]
    });
    await similarCandidiates(singleCandidate)
    res.json(singleCandidate);
  } catch (err) {
    next(err);
  }
});


const similarCandidiates = async (candidateObj)=>{
  const candidates = await Candidate.findAll({
    where: {
      title: candidateObj.title,
    },
    include: [
      {model: Company,
      on: {
        col1: Sequelize.where(Sequelize.col("candidate.company_id"), "=", Sequelize.col("company.company_id"))
      }}]

  });
  const simpleCandidates = candidates.map((elem)=>{
    return({
    id: elem.candidate_id,
    coding: elem.coding_score,
    communication: elem.communication_score,
    title: elem.title,
    companyId: elem.company_id,
    fractal: elem.company.fractal_index
  })
  }).filter((obj)=>{
    return(
      Math.abs(candidateObj.company.fractal_index - obj.fractal) < 0.15
    )
  })
  console.log('candidates', simpleCandidates)
}
