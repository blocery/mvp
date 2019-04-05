import axios from 'axios'
import { Server } from "../components/Properties";

/**
 * return true: 로그인된 상태.
 *        false: need Login,.
 */
export const getLoginFlag = () => axios(Server.getRestAPIHost() + '/login', { method: "get", withCredentials: true, credentials: 'same-origin' })
    .then((response)=> {
        console.log(response);
        if (response.data === '') {  //return null
            console.log('NEED to LOGIN');
            return false;
        }
        if (response.data.status === 200) {

            const displayName = response.data.displayName;
            return true;

        }else {
            console.log('getLoginUser ERROR:' + response.data.status);
            return false;
        }
    }).catch(function (error) {
        console.log(error);
    });

/**
 * return '': 로그인 필요한 상태.
 *        LoginInfo: 백엔드 dbdata참조
 */
export const getLoginUser = () => axios(Server.getRestAPIHost() + '/login', { method: "get", withCredentials: true, credentials: 'same-origin' })
    .then((response)=> {
    console.log(response);
    if (response.data === '') {  //return null
        console.log('NEED to LOGIN');
        return '';
    }
    if (response.data.status === 200) {

        const displayName = response.data.displayName;
        return response.data;

    }else {
        console.log('getLoginUser ERROR:' + response.data.status);
    }
}).catch(function (error) {
    console.log(error);
});


