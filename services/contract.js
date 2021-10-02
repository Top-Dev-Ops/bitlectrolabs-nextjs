import Web3 from 'web3'

import { SAY_UNWRAP_TOKEN } from './bitlectro'

const CONTRACT_ABI = require('./pre_audit_abi.json')

export function UNWRAP_TOKEN(tokenId) {
    const W3 = new Web3(window.ethereum)
    
    const CONTRACT = new W3.eth.Contract(CONTRACT_ABI, '0xf1B33aC32dbC6617f7267a349be6ebb004FeCcff')

    const owner = W3.currentProvider.selectedAddress

    CONTRACT.methods.unwrapToken(tokenId).send({
        from: owner
    }).then(res => {
        console.log(res)

        SAY_UNWRAP_TOKEN(tokenId).then(res => {
            console.log('META FROM BIT: ', res)
            return res
        })
    }).catch(error => console.log(error))
}

export async function MINT_PURCHASE_TOKEN(token_count) {
    const owner = W3.currentProvider.selectedAddress

    await CONTRACT.methods.calculatePrice().call().then(price => {
        purchase(price)
    })

    function purchase(total_price) {
        CONTRACT.methods.mint().send({
            from: owner,
            value: total_price
        }).then(result => {
            console.log(result)
        }).catch(error => console.log(error))
    }
}