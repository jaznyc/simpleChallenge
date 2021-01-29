const { expect } = require('chai');
const { db } = require('../server/db');
const app = require('../server');
const agent = require('supertest')(app);
const candidate = db.model('candidate');
const company = db.model('company');

describe('candidate route', () => {
  beforeEach(async () => {
    await db.sync({ force: true });
    await company.create({
      company_id: 6,
      fractal_index: 0.956,
    });
    await company.create({
      company_id: 7,
      fractal_index: 0.978,
    });
    await candidate.create({
      candidate_id: 950,
      communication_score: 107890,
      coding_score: 89760,
      title: 'Engineer',
      company_id: 6,
    });
    await candidate.create({
      candidate_id: 953,
      communication_score: 289705,
      coding_score: 189760,
      title: 'Engineer',
      company_id: 7,
    });
    await candidate.create({
      candidate_id: 955,
      communication_score: 100500,
      coding_score: 100000,
      title: 'Senior Engineer',
      company_id: 6,
    });
    await candidate.create({
      candidate_id: 957,
      communication_score: 200000,
      coding_score: 50000,
      title: 'Senior Engineer',
      company_id: 7,
    });
  });

  it('GET /api/candidate/candidateId', async () => {
    const res = await agent.get(`/api/candidates/950`).expect(200);
    expect(res.body).to.be.an('object');
    expect(res.body.title).to.equal('Engineer');
    expect(res.body.comPercentile).to.equal(0);
    expect(res.body.codePercentile).to.equal(0);
  });
  it('GET /api/candidate/candidateId', async () => {
    const res = await agent.get(`/api/candidates/955`).expect(200);
    expect(res.body).to.be.an('object');
    expect(res.body.title).to.equal('Senior Engineer');
    expect(res.body.comPercentile).to.equal(0);
    expect(res.body.codePercentile).to.equal(0.5);
  });
});
