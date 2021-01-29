const fs = require('fs');
const Pool = require('pg').Pool;
const fastcsv = require('fast-csv');
const { db } = require('../server/db');

async function createTable() {
  await db.sync({ force: true });
  await db.close();

  let stream = fs.createReadStream('script/companies.csv');
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
        'INSERT INTO "companies" ("company_id", "fractal_index") VALUES ($1, $2)';

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
