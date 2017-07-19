const pgp = require('pg-promise')()
const connectionString = `pg://${process.env.USER}@localhost:5432/moviesdb`
const db = pgp( connectionString )

exports.queries = {
  findByEmail: (email) => db.one('SELECT * FROM users WHERE email = $1', [email]),

  findById: (id) => db.one('SELECT * FROM users WHERE id = $1', [id]),

  create: (email, password) => db.one('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING (id)', [email, password])
}
