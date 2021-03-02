import { get, post } from '@/utils/request'; // eslint-disable-line no-unused-vars
export function userLogin(data) {
    return post('/api/user/login', data);
}
