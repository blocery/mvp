/**
 * BaseContract - super class of all contracts (using Web3 & TruffleContract)
 *
 * <History>
 * @author  Yong Kim (yongary.kim@gmail.com)
 * @date 2018.4.5 - BaseContract first created
 * @date 2018.6.29 - BaseGethContract created
 *
 */
import Web3 from 'web3';
import BaseContract, {promisify} from './BaseContract';
import axios from 'axios';
import { Server } from '../components/Properties';

//geth연결은 위한 BaseContract
export default class BaseGethContract extends BaseContract {

    constructor() {
        super();
        this.gasPrice = 4001000000; //4Gwei + alpha
    }

    initWeb3() {

        //Server provider you want from Web3.providers
        console.log("initWeb3: gethServer");
        this.web3 = new Web3(new Web3.providers.HttpProvider(Server.getGethServer()));

        console.log(this.web3);
    }

    initContract = async (contractJson) => {
        super.initContract(contractJson);

        await this.getGasPriceFromGeth(); //gasPrice Setting
    }

    /*
        Baseaccount 언락하기
        returns:
            unlockedAccount : 성공시. 로그인상태에서만 가능
            Server.ERROR: 에러시
     */
    getBaseAccountUnlocked = () => {
        return axios(Server.getRestAPIHost() + '/baseAccountUnlocked',
            {   method:"get",
                withCredentials: true,
                credentials: 'same-origin'
            }
        ).then((response) => {
                return response.data;
            });
    }

    /*
        My account 언락하기
        returns:
            unlockedAccount : 성공시. 로그인상태에서만 가능
            Server.ERROR: 에러시
     */
    getMyAccountUnlocked = async () => {
        return axios(Server.getRestAPIHost() + '/myAccountUnlocked',
            {   method:"get",
                withCredentials: true,
                credentials: 'same-origin'
            }
        ).then((response) => {
            return response.data;
        });
    }

    getMyAccount = async () => {
        return axios(Server.getRestAPIHost() + '/myAccount',
            {   method:"get",
                withCredentials: true,
                credentials: 'same-origin'
            }
        ).then((response) => {
            return response.data;
        });
    }

    getBaseAccount = async () => {
        //ropsten에서는 getAccounts 동작하지 않을 수도 있기 때문에 안전하게 backend 이용.
        return axios(Server.getRestAPIHost() + '/baseAccount',
            {   method:"get",
                withCredentials: true,
                credentials: 'same-origin'
            }
        ).then((response) => {
            return response.data;
        });
    }

    /////// Utility Functions ///////////////////
    getGasPrice = () => {
        return this.gasPrice;
    }

    //private함수임. 일반적으로는 getGasPrice()사용
    getGasPriceFromGeth = async () => {
        await axios(Server.getRestAPIHost() + '/gasPrice',
            {   method:"get",
                withCredentials: true,
                credentials: 'same-origin'
            }
        ).then((response) => {
            this.gasPrice = response.data ;
            console.log("getGasPriceFromGeth:" + this.gasPrice);
        });
    }

}
