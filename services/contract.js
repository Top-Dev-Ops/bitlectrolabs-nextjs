import Web3 from 'web3'

import { SAY_UNWRAP_TOKEN } from './bitlectro'

const CONTRACT_ABI = require('./pre_audit_abi.json')

export function UNWRAP_TOKEN(tokenId) {
    const W3 = new Web3(window.ethereum)

    // TEST CASE
    const CONTRACT = new W3.eth.Contract(CONTRACT_ABI, '0x49dF087aA113859000fb6fde8f768330Add9c83F')
    // DEPLOYMENT CASE
    // const CONTRACT = new W3.eth.Contract(CONTRACT_ABI, '0xf1B33aC32dbC6617f7267a349be6ebb004FeCcff')

    // TEST CASE
    const owner = '0xdCD0739CA8935f13f1253a6c5C95D406560e5f6E'
    // DEPLOYMENT CASE
    const userAddress = W3.currentProvider.selectedAddress
    console.log(`USER ADDRESS : ${userAddress}`)

    CONTRACT.methods.unwrapToken(tokenId).send({
        from: owner
    }).then(res => {
        console.log('INSIDE UNWRAP IN contract.js')
        console.log(res)

        SAY_UNWRAP_TOKEN(tokenId).then(res => {
            console.log('META FROM BIT: ', res)
            return res
        })
    }).catch(error => console.log(error))
}