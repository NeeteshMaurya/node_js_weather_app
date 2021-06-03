const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const weather = require('./utils/weather')


const app = express()

//Define Paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebars engine and views Location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup Static Directory to serve
app.use(express.static(publicDirectoryPath))


//index.hbs Dynamic page
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather'
    })
})

//About
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Neetesh'
    })
})

//Help
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an Address'
        })
    }
    geocode(req.query.address, (error , {latitude, longitude, location} ={} ) => {
        if (error) {
            return res.send({error})
        }
        weather(latitude, longitude, (error, weatherData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: weatherData,
                address: req.query.address,
                location
            })
            
        })
    })

})

//Error
app.get('*', (req, res) => {
    res.render('404',{
        errorMessage: 'Eroor 404: Page Not Found'
    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000')
})