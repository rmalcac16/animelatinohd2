import axios from 'axios';
import LaravelEncrypt from './laravel-encrypt';

const encryptionKey = process.env.APIKEY;
const encryptor = new LaravelEncrypt(encryptionKey);

export const api = axios.create({
    baseURL: process.env.APIURL,
    timeout: 10000,
});

export async function fetchData(endpoint) {
    const res = await api.get(endpoint);
    const decryptedData = encryptor.decrypt(res.data.data);
    return JSON.parse(decryptedData);
}
