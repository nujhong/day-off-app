import axios from 'axios';
import { getRegion } from './region';

// https://data.gov.au/dataset/australian-holidays-machine-readable-dataset
const RESOURCE = 'a24ecaf2-044a-4e66-989c-eacc81ded62f';

export function getHolidays() {
  return getRegion()
    .then(region => {
      return axios.get(`https://data.gov.au/api/action/datastore_search_sql?sql=SELECT * FROM "${RESOURCE}" WHERE "Applicable To" LIKE '%NAT%' OR "Applicable To" LIKE '%${region}%'`)
    .then(res => { return res.data.result.records; })
    .catch(err => { return Promise.reject(err); });
  });
};
