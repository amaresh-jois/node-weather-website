const request = require('postman-request')
const fs = require('fs')
const path = require('path')

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=01a32a44056775f0f3f566029fe42fbb&query='+ latitude +','+ longitude +'&units=f'

    const caFile = path.join(__dirname, '/ssl/zScaler.pem')

    if (isNaN(latitude) || latitude===null){
        callback(latitude + ' is not right for Latitude', undefined)

    } else if (isNaN(longitude) || longitude===null){
        callback(longitude + ' is not right for Longitude', undefined)
    
    } else {
        // request({ url: url, json: true}, (error, response) => {
        request(
            {
                url, 
                json: true
                // ca: fs.readFileSync('./zScaler1.pem')
            }, 
            (error, {body}) => {

            if (error) {
                callback('Unable to connect to weather service', undefined)
            // } else if (response.body.error) {
            } else if (body.error) {
                callback('Unable to find location', undefined)
            } else {
                // callback(
                //     undefined, 
                //     response.body.current.weather_descriptions[0] +
                //         ". It is currently " + response.body.current.temperature +
                //         " degrees out. Feels like " + response.body.current.feelslike + " degrees out"
                //     )
                callback(
                    undefined, 
                    body.current.weather_descriptions[0] +
                        ". It is currently " + body.current.temperature +
                        " degrees out. Feels like " + body.current.feelslike + " degrees out"
                    )
    
            }
        })
    }


}

module.exports = forecast

// BELOW COMMENTED CODE WITHOUT CALLBACK

// const url =    'http://api.weatherstack.com/current?access_key=01a32a44056775f0f3f566029fe42fbb&query=37.8267,-122.4233&units=f'
// // const url = 'http://api.weatherstack.com/current?access_key=01a32a44056775f0f3f566029fe42fbb&query=0,0&units=f'

// request({ url: url, json: true}, (error, response) => {

//     if (error) {
//         console.log('Unable to connect to weather service')
//     } else if (response.body.error) {
//         console.log('Unable to find location')
//     } else {
//         // const data = JSON.parse(response.body)
//         console.log(response.body.current.weather_descriptions[0], 
//             ". It is currently", response.body.current.temperature, 
//             "degrees out. Feels like", 
//             response.body.current.feelslike, "degrees out")
//     }
// })

