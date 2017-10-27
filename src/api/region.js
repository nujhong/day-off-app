import axios from 'axios';

const API_KEY = 'AIzaSyBUjtEW9N9z6MKywjHlwHB9F99Xc6sUjK0';

export function getRegion() {
  // navigator.geolocation.getCurrentPosition(function(location) {
  //   console.log(location.coords.latitude);
  //   console.log(location.coords.longitude);
  //   console.log(location.coords.accuracy);
  // });
  return axios
    .post('https://www.googleapis.com/geolocation/v1/geolocate?key=' + API_KEY)
    .then(res => {
      const { lat, lng } = res.data.location;
      return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}&result_type=administrative_area_level_1`)
    })
    .then(res => res.data.results[0].address_components[0].short_name)
    .catch(err => Promise.reject(err));
};
