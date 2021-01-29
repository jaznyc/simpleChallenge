const fs = require('fs');
const Pool = require('pg').Pool;
const fastcsv = require('fast-csv');
const { db } = require('../server/db');

async function createTable() {
  await db.sync();
  await db.close();

  let stream = fs.createReadStream('script/score-records.csv');
  let csvData = [];
  let csvStream = fastcsv
    .parse()
    .on('data', function (data) {
      csvData.push(data);
    })
    .on('end', function () {
      csvData.shift();

      const pool = new Pool({
        host: 'localhost',
        user: 'postgres',
        database: 'simpleChallenge',
        port: 5432,
      });

      const query =
        'INSERT INTO "candidates" ("candidate_id", "communication_score", "coding_score", "title", "company_id") VALUES ($1, $2, $3, $4, $5)';

      pool.connect((err, client, done) => {
        if (err) throw err;

        try {
          csvData.forEach((row) => {
            client.query(query, row, (err, res) => {
              if (err) {
                console.log(err.stack);
              } else {
                console.log('inserted ' + res.rowCount + ' row:', row);
              }
            });
          });
        } finally {
          done();
        }
      });
    });

  stream.pipe(csvStream);
}

createTable();
