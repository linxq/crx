import axios from 'axios';

export function submitImage(data) {
  return axios.post('/api/image/genMainImage', { data });
}
