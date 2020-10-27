const express = require('express')
const hbs = require('express-handlebars')

const app = express()



app.engine('hbs',hbs({defaultLayout: 'main.hbs'}))
app.set('view engine', 'hbs')

app.use(express.static('public'));
app.use(express.static('public/dice_images'));

app.get('/', (req,res,next)=>{
    res.status(200).type('text/html')
    res.render('landing')
})
app.get('/roll', (req,res,next)=>{

    const dice1 = Math.floor((Math.random()*5)+1)
    const dice2 = Math.floor((Math.random()*5)+1)
    res.render('roll', {dice1: dice1, dice2: dice2})
})
app.use((req,res)=>{
    res.redirect('/')
})

app.listen(3000, console.log('App is listening at PORT: 3000'))
