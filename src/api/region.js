import axios from 'axios';

export function getRegion() {
  // navigator.geolocation.getCurrentPosition(function(location) {
  //   console.log(location.coords.latitude);
  //   console.log(location.coords.longitude);
  //   console.log(location.coords.accuracy);
  // });

  return axios.get('http://ip-api.com/json')
    .then(res => {
      console.log(res);
      return res.data.region;
    })
    .catch(err => { return Promise.reject(err); });
};
