import Web3 from "web3";

import { toast } from "react-toastify";

//start empty, append provider in calls
const W3 = new Web3();

const CONTRACT_ABI = require('./dreamloops.json');

const CONTRACTID = '0xf1B33aC32dbC6617f7267a349be6ebb004FeCcff';

const CONTRACT = new W3.eth.Contract(CONTRACT_ABI, CONTRACTID);

//change provider to metamask provider
//reason: server side rendering
function setWeb3Provider(W3) {
    W3.setProvider(window.ethereum);
}

export async function UNWRAP_DREAMLOOP (token_id) {

    setWeb3Provider(W3);

    let owner = await W3.eth.getAccounts();

    return await CONTRACT.methods.unwrapToken(token_id).send({from: owner[0]});
    
}

export async function IS_DREAMLOOP_UNWRAPPED(token_id) {

    setWeb3Provider(W3);

    return await CONTRACT.methods.isUnwrapped(token_id).call();

}
