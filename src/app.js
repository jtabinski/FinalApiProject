const transitKey = 'api-key=BW4rOzRErQbKDPpVzhq6&destination=geo/';
const mapboxKey = '&access_token=pk.eyJ1IjoianRhYmluc2tpIiwiYSI6ImNrcDVrbzRvMjBiZHIyb3AyM3NiZGw1am4ifQ.digShKRT7xLV-Va_Uwwn0g';
const transitUrl = 'https://api.winnipegtransit.com/v3/trip-planner.json?origin=geo/'
const mapboxApi = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
const bbox = '.json?bbox=-97.325875, 49.766204, -96.953987, 49.99275'

// // <li data-long="-97.154506" data-lat="49.821786">
// <div class="name">IGI Bbq and Sushi Bistro</div>
// <div>1845 Pembina Hwy</div>
// </li>
//-97.325875, 49.766204, -96.953987, 49.99275   
//"https://api.mapbox.com/geocoding/v5/mapbox.places/starbucks.json?bbox=-77.083056,38.908611,-76.997778,38.959167&access_token=pk.eyJ1IjoianRhYmluc2tpIiwiYSI6ImNrcDVrbzRvMjBiZHIyb3AyM3NiZGw1am4ifQ.digShKRT7xLV-Va_Uwwn0g"

const originForm = document.querySelector('origin-form');
const destinationForm = document.querySelector('destination-form');
const startingLocationsElement = document.querySelector('origins');
const destinationsElement = document.querySelector('destinations');
const planTripButton = document.querySelector('button-container');



const getAddress = async function(query) {
  const url = `${mapboxApi}${query}${bbox}${mapboxKey}`
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

const featureHtmlBuilder = function(feature) {
  `
<li data-long="${feature.center[0]}" data-lat="${feature.center[1]}">
          <div class="name">${feature.text}</div>
          <div>${feature.properties.address}</div>
        </li>`

}

console.log(getDestination('starbucks'))
