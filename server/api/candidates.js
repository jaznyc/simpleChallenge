
const { Candidate } = require('../db');
const { Company } = require('../db');
const Sequelize = require('sequelize')
const router = require('express').Router();
module.exports = router;

let cacheObj = {}

router.get('/:candidateId', async (req, res, next) => {
  try {
    const candidateId = req.params.candidateId
    if(cacheObj[candidateId]){
      console.log('used Cahce')
      res.json(cacheObj[candidateId])
    }else{
    const singleCandidate =await findCandidate(candidateId)
    const similarCandidates = await findSimilarCandidiates(singleCandidate)
    const percentile = findPercentile(similarCandidates,singleCandidate.communication_score, singleCandidate.coding_score)
    console.log('perc', percentile)
    const retObj = {title: singleCandidate.title, comPercentile: percentile.comPercentile, codePercentile: percentile.codePercentile}
    cacheObj[candidateId] = retObj
    res.json(retObj);
    }
  } catch (err) {
    next(err);
  }
});

const findCandidate = async (id)=>{
  const singleCandidate = await Candidate.findOne({
    where: {
      candidate_id: id,
    },
    include: [
    {model: Company,
    on: {
      col1: Sequelize.where(Sequelize.col("candidate.company_id"), "=", Sequelize.col("company.company_id"))
    }}]
  });
  return singleCandidate
}



const findSimilarCandidiates = async (candidateObj)=>{
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
  const similarCandidates = candidates.map((elem)=>{
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
  console.log('candidates', similarCandidates)
  return similarCandidates
}

const findPercentile = (arr, comScore, codeScore) =>{
  let total = arr.length
  let comRank = arr.filter((elem)=>{
    return elem.communication < comScore
  }).length
  console.log('comRank',comRank)
  let codeRank = arr.filter((obj)=>{
    return obj.coding < codeScore
  }).length
  console.log('codeRank',codeRank)
  return {comPercentile: comRank/total, codePercentile: codeRank/total}

}
