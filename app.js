const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const path = require('path')
const session = require('express-session')

const { queries } = require('./database/queries.js')

app.set( 'view engine', 'ejs')
// app.engine( 'html', require('ejs').renderFile )
app.use(express.static(path.join(__dirname, 'public')))
app.use( bodyParser.json() )
app.use( bodyParser.urlencoded({ extended: true }) )
app.use( session({
  name: 'session',
  secret: 'you will never know',
  cookie: { maxAge: 300000 }
}))

app.get('/', (req, res) => {
  if (req.session.userid) {
    res.render('home')
  } else {
    res.render('signin')
  }
})

app.get('/profile', (req, res) => {
  res.render('profile')
})

app.get('/signup', (req, res) => {
  res.render('signup')
})

app.get('/signin', (req, res) => {
  res.render('signin')
})

app.get('/signout', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})

app.post('/signin', (req, res) => {
  const user = req.body
  queries.findByEmail( user.email )
    .then( data => {
      if ( data.password === user.password ) {
        req.session.userid = data.id
      }
    })
    .then( () => res.redirect('/') )
})

app.post('/signup', (req, res) => {
  const user = req.body
  queries.create( user.email, user.password )
    .then( data => req.session.userid = data.id )
    .then( () => res.redirect('/') )
})

app.listen( 3000, () => {
  console.log('listening on port 3000')
})
