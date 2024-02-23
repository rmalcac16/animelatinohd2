import { api } from '../lib/api';

export const generateToken = async (id) => {
    try {
        const res = await api.get(`token/` + id);
        return res.data.token;
    } catch (error) {
        return '';
    }
};
