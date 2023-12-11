import axios from 'axios';

export const digitalOceanApi = axios.create({
  baseURL: 'https://api.digitalocean.com/v2',
});
