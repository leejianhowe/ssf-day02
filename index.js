// require modules
const express = require('express')
const hbs = require('express-handlebars')

// configure environment
const PORT = parseInt(process.argv[2]) || parseInt(process.env.PORT) || 3000

// create instance of express
const app = express()

// create diceROLL funciton
const diceRoll = () => Math.floor((Math.random() * 6) + 1)

// set up handlebars
app.engine('hbs', hbs({
  defaultLayout: 'main.hbs'
}))
app.set('view engine', 'hbs')

// load static resources
app.use(express.static('public'));
app.use(express.static('public/dice_images'));


// GET / method for homepage
app.get(['/','/index.html'], (req, res, next) => {
  // status 200 type(text/html)
  res.status(200).type('text/html')
  // render
  res.render('landing')
})

// GET /roll method
app.get('/roll', (req, res, next) => {
  const dice1 = diceRoll()
  const dice2 = diceRoll()
  const number = dice1 + dice2
  res.status(200).type('html')
  // res.render('roll', {
  //   dice1: dice1,
  //   dice2: dice2,
  //   number: number
  // })
  // if key names are the same just type them once
  res.render('roll',{
    dice1, dice2, number
  })
})
// catches all other resouces and redirects to  '/'
app.use((req, res) => {
  res.redirect('/')
})

// start express
app.listen(PORT, console.log(`PORT ${PORT} is running at ${new Date()} on http://localhost:${PORT}/`))
