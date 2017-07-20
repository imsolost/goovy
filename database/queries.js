const pgp = require('pg-promise')()
const connectionString = `pg://${process.env.USER}@localhost:5432/moviesdb`
const db = pgp( connectionString )

exports.queries = {
  findByEmail: (email) => db.one('SELECT * FROM users WHERE email = $1', [email]),

  create: (email, password) => db.one('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING (id)', [email, password]),

  historyById: (user_id) => db.any('SELECT * FROM history WHERE user_id = $1', [user_id]),

  history: (user_id, movie) => db.none('INSERT INTO history (user_id, movie) VALUES ($1, $2)', [user_id, movie])
}
