import axios from 'axios';

export function imageHello(data: any) {
    return axios.get('/api/image', { data });
}