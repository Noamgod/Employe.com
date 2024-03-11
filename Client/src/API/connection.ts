import axsio from 'axios';
import API_URL from './config.ts';
import Cookies from 'js-cookie';
import {User} from "./type/user";

const api = axsio.create({
    baseURL: `${API_URL}/user`,
});

const API = async (url: string, method: string, data: any): Promise<User | User[] | number> => {
    const token = Cookies.get('Authorization');
    const response = await api({
        url,
        method,
        data: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },
    });
    if (response.data["Authorization"]) {
        const token = response.data["Authorization"]
        Cookies.set('Authorization', token, {expires: 30});
        return response.data['user'];
    }
    return response.data;
}
export default API;