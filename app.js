const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const path = require('path')
// require session stuff here

app.set( 'view engine', 'ejs')
// app.engine( 'html', require('ejs').renderFile )

app.use(express.static(path.join(__dirname, 'public')))
app.use( bodyParser.json() )
app.use( bodyParser.urlencoded({ extended: true }) )

//session stuff here

app.get('/', (req, res) => {
  res.render('home')
})

app.get('/profile', (req, res) => {
  res.render('profile')
})

app.get('/signup', (req, res) => {
  res.render('signup')
})

app.get('/login', (req, res) => {
  res.render('login')
})

app.get('/logout', (req, res) => {
  res.render('logout')
})

// app.get(`/${input}`, (req, res) => {
//   res.render(`${input}`)
// })

app.listen( 3000, () => {
  console.log('listening on port 3000')
})
