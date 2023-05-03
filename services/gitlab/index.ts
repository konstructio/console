import axios from 'axios';

export const gitlabApi = axios.create({
  baseURL: 'https://gitlab.com/api/v4',
});
