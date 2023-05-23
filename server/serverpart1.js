// Name:         server.js
//
// Description:   Express server to provide flight tracking information. 
//                First step of lab 6
//
// Author:   

// Name of the script. Used in console log messages.
scriptName = "server.js: "

// Port # for Express Server
const PORT = 8000

// Import the required modules

const express = require("express")

const app = express()

const cors = require("cors")

// Allow us to load environment variables from .env file
require("dotenv").config()

// *Need version 2.6.* of node-fetch library*
const fetch = require("node-fetch")

const request = require("request");
const { response } = require("express")

// Get the API Key from an Environment Variable called: FLIGHTS_API_KEY
const myFlightsAPIKey = process.env.flightsAPIKey

console.log("server.js(): myFlightsAPIKey: " + myFlightsAPIKey)

// Distance to find nearby airports
const nearbyAirportDistance = process.env.nearbyAirportDistance

console.log("nearby airport distance: " + nearbyAirportDistance)

// API URL
const api_base = "https://airlabs.co/api/v9/";

app.get('/hello', async (request, response) => {
  console.log("Hello to You! API route has been called")

  response.send({message: "Hello to You"})
  
})

app.get('/flights', async (request, response) => {
  console.error("/flights is an invalid route")
  response.send("/flights is an invalid route")
  
})

// Express Route to Get Flights for Specified Airport
app.get('/flights/:airport_code', async (request, response) => {

  scriptName = "server.js: /flights/:airport_code(): "
  console.log("in " + scriptName + " ...")
  try {
          // Airport Code Parameter 
          console.log(scriptName + " request.params.airport_code: " + request.params.airport_code)

          var my_airport_code = request.params.airport_code
          console.log(scriptName + " airport_code: " + my_airport_code)

          // Check if airport_code is being passed in
          console.log(scriptName + "  length of airport code: " + my_airport_code.length)


        if (my_airport_code.length < 1) {

            my_airport_code = process.env.defaultAirportCode
            alert("Missing airport code.  Default set to: " + my_airport_code)
        }

          // Airport Code Parameter 
          console.log(scriptName + " request.params.airport_code: " + request.params.airport_code)

          var my_airport_code = request.params.airport_code
          console.log(scriptName + " airport_code: " + my_airport_code)

          // Check if airport_code is being passed in
          console.log(scriptName + "  length of airport code: " + my_airport_code.length)



          // Arrivals
          const api_url = 'https://airlabs.co/api/v9/flights?api_key=' + myFlightsAPIKey + '&arr_iata=' + my_airport_code

          console.log("*my airport code: " + api_url)

          const fetch_response = await fetch (api_url);
          const json = await fetch_response.json();

          console.log(json)

          // Read the response stream and produce and return a JavaScript object
          response.json(json);

          console.log(" +++++++++ calling runQueries() +++++++++++++++")
          
          // Call runQueries
          //runQueries(json)

          console.log(" +++++++++ completed runQueries() +++++++++++++++")

          console.log(`${scriptName} ++++++++++++ done with getFlights airport code: ++++++++++++++` + my_airport_code)
        }
  catch (error) {
    console.error(scriptName + " Error getting flights for airport: " + error.stack)
  }

}); //end flights


// Start the server and listen on the specified port #
app.listen(PORT, '0.0.0.0', function(error) {

  if (error) {
    console.error("Error while starting server" + error.stack)
  }
  else {
    console.log("Node Server is Listening on PORT: " + PORT)
  }
})