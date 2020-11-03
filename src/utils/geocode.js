const request = require('postman-request')
const fs = require('fs')
const path = require('path')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +  encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiY21hajAwMDEiLCJhIjoiY2tncWdndmhuMDR6bDMyb2I4Z2ZqbmhwZyJ9.zaKXdkuu4vvCON5A0ejLqQ&limit=1'

    // console.log(__dirname)
    // const caFile = path.basename('C:\\node-course\\web-server\\ssl\\zScaler1.pem')

    request(
    { 
        url: url,
        json:true,
        ca: fs.readFileSync('./zScaler1.pem')
    }, 
    (error, response) => {
    // request({ url, json:true}, (error, {body}) => {

        if (error){
            callback(
                'Unable to connect to Location service',
                undefined
            )
        } else if (response.body.features.length===0) {
        // } else if (body.features.length===0) {
            callback(
                'Unable to find the co-ordinates for the search. Please refine your search',
                undefined
            )
        } else {

            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
                // latitude: body.features[0].center[1],
                // longitude: body.features[0].center[0],
                // location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode

// BELOW COMMENTED CODE WITHOUT CALLBACK

// const urlGeoCoding = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiY21hajAwMDEiLCJhIjoiY2tnNTVoM2kxMHJhNzJxcW5tdmIxdnd5cyJ9.rPfyqlArbBZDgNAzWdlBsA&limit=1'
// // const urlGeoCoding = 'https://api.mapbox.com/geocoding/v5/mapbox.places/12what.json?access_token=pk.eyJ1IjoiY21hajAwMDEiLCJhIjoiY2tnNTVoM2kxMHJhNzJxcW5tdmIxdnd5cyJ9.rPfyqlArbBZDgNAzWdlBsA&limit=1'

// request({ url: urlGeoCoding, json:true}, (error, response) => {
//     if (error) {
//         console.log('Unable to connect to Location service')
//     } else if (response.body.features.length===0) {
//         console.log('Unable to find the co-ordinates for the search. Please refine your search')
//     } else {
//             // const data = JSON.parse(response.body)
//             const latitude = response.body.features[0].center[1]
//             const longitude = response.body.features[0].center[0]
//             console.log("Latitude:", latitude, 
//             "Longitude:", longitude)
//     }
// })
