import axios from 'axios';

export const api = axios.create({
    baseURL: process.env.APIURL,
    timeout: 10000,
});

export async function fetchData(endpoint) {
    const res = await api.get(endpoint);
    return res.data.data;
}
