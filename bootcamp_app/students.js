const { Pool } = require('pg');

const pool = new Pool ( {
  user: 'afreeda', 
  pasword: '123', 
  host: 'localhost', 
  database: 'bootcampx'
});

const cohort = process.argv[2];
const limit = process.argv[3] || 5;

pool.query(`
SELECT students.id as id, students.name as name, cohorts.name as cohort
FROM students
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE $1
LIMIT $2;
`, [`%${cohort}%`, limit])
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.name} has an id of ${user.id} and was in the ${user.cohort} cohort`);
  })
})
.catch(err => console.error('query error', err.stack));