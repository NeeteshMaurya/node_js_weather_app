const request = require('request')

const weather = (latitude,longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=b53c4b391fc712efaa7e3def05fa7368&query=' + latitude + ',' + longitude + ''

    request({url: url,json:true}, (error, response) => {
    
        if(error){
            callback('Unable to connect with weather App!', undefined)
        } else if (response.body.error) {
            callback('Unable to find Location! Please try again', undefined)
        }else{
            callback(undefined, 'Weather Description : ' + response.body.current.weather_descriptions[0] + '. The Temperature is ' +response.body.current.temperature +' but it feels like ' +response.body.current.feelslike)
        }
    })
}

module.exports = weather

