require('dotenv').config();
var formatDistanceToNow = require('date-fns/formatDistanceToNow');
var parseISO = require('date-fns/parseISO');
const axios = require('axios');
async function getPolution(lat, lng) {
    try {
      const AIR_KEY = process.env.AIR_KEY;
      const URL = `http://api.airvisual.com/v2/nearest_city?lat=${lat}&lon=${lng}&key=${AIR_KEY}`;
      const response = await axios.get(URL);
      const { location, current} = response.data.data;
      console.log(location);
      console.log(current);
      var result = parseISO(current.pollution.ts);
      console.log(formatDistanceToNow(result));
      return response.data;
    } catch (error) {
      console.error(error);
    }
}
getPolution(13.6531924, 100.6708034);