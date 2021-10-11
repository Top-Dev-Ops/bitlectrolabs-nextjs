import Web3 from 'web3'

import { toast } from 'react-toastify'

//ammend provider in calls
const W3 = new Web3();

//LOCAL RPC abi - change for launch
const CONTRACT_ABI = require('./dreamer_local_rpc.json');

//LOCAL RPC address - change for launch
const CONTRACT = new W3.eth.Contract(CONTRACT_ABI, '0x76B86a31AeC46bC21D2b7a797bBe88B193b3D2A4')

//change provider to metamask provider
//reason: server side rendering
function setWeb3Provider(W3) {
    W3.setProvider(window.ethereum);
}

export async function CALCULATE_PRICE() {

    setWeb3Provider(W3)

    return await CONTRACT.methods.calculatePrice().call().then(price => {
        return W3.utils.fromWei(price.toString(), 'ether');
    })
}

export async function CALCULATE_PRICE_MULTIPLE(quantity) {

    setWeb3Provider(W3)

    return await CONTRACT.methods.calculatePrice().call().then(price => {
        
        let total = price * quantity;

        return W3.utils.fromWei(total.toString(), 'ether');

    })
}

// MINT / CLAIM SWITCHES
export async function CHECK_PUBLIC_SWITCH() {

    setWeb3Provider(W3)

    return await CONTRACT.methods.getPublicSwitch().call().then(bool => {
        return bool
    }).catch(error => {
        console.log(error)
    });
}

export async function CHECK_DREAMLOOP_SWITCH() {

    setWeb3Provider(W3)

    return await CONTRACT.methods.getDreamloopSwitch().call().then(res => {
        return res
    }).catch(error => {
        console.log(error)
    });
}

export async function CHECK_PRESALE_SWITCH() {

    setWeb3Provider(W3)

    return await CONTRACT.methods.getWhitelistSwitch().call().then(res => {
        return res
    }).catch(error => {
        console.log(error)
    });
}

export async function CHECK_AIRDROP_SWITCH() {

    setWeb3Provider(W3)

    return await CONTRACT.methods.getAirdropSwitch().call().then(res => {
        return res
    }).catch(error => {
        console.log(error)
    });
}

// UNWRAP SWITCH

export async function CHECK_UNWRAP_SWITCH() {

    setWeb3Provider(W3)

    return await CONTRACT.methods.getUnwrapSwitch().call().then(res => {
        return res
    }).catch(error => {
        console.log(error)
    });
}

//DREAMLOOP WHITELIST

export async function DREAMLOOP_BALANCE() {

    setWeb3Provider(W3)

    const owner = await W3.eth.getAccounts();

    console.log(owner)

    return await CONTRACT.methods.getDreamloopsBalanceOf(owner[0]).call().then(balance => {
        return balance
    })
}

//has the token being input already been claimed?
export async function CHECK_TOKEN_CLAIMED(tokenID) {

    setWeb3Provider(W3)

    return await CONTRACT.methods.getDreamloopsTokenClaimed(tokenID).call().then(bool => {
        return !bool
    }).catch(error => {
        toast.error('Token has already been claimed')
    })
}

export async function CHECK_DREAMLOOP_OWNER(tokenID) {

    setWeb3Provider(W3)

    let owner = await W3.eth.getAccounts();

    return await CONTRACT.methods.getDreamloopsOwner(tokenID).call().then(addr => {
        if(addr == owner[0]) {
            return true
        } else {
            toast.error(`You aren't the owner of Dreamloop #${tokenID}`)
            return false
        }
    }).catch(error => {
        console.log(error)
    })
}

export async function GET_DREAM_USER_REDEEM_COUNT() {

    setWeb3Provider(W3)

    const owner = await W3.eth.getAccounts();

    return await CONTRACT.methods.getDreamUserRedeemCount(owner[0]).call().then(quantityRedeemed => {
        return quantityRedeemed
    }).catch(error => {
        console.log(error)
    })
}

export async function DREAMLOOP_WHITELIST_MINT(tokenID) {

    setWeb3Provider(W3)

    const owner = await W3.eth.getAccounts();

    return await CONTRACT.methods.dreamloopMint(tokenID).send({
        from: owner[0],
        value: await CONTRACT.methods.calculatePrice().call().then(price => {
            return price
        })
    })
}

//PRIVATE WHITELIST

export async function CHECK_WHITELIST_USER() {

    setWeb3Provider(W3)

    const owner = await W3.eth.getAccounts();

    return await CONTRACT.methods.getWhitelistUser(owner[0]).call().then(bool => {
        return bool
    }).catch(error => {
        console.log(error)
        toast.error(`${owner[0]}: isn't on presale whitelist...`)
    })
}

export async function GET_WHITELIST_MAX_ENTITLEMENT() {

    setWeb3Provider(W3)

    const owner = await W3.eth.getAccounts()
    
    return await CONTRACT.methods.getWhitelistEntitlement().call().then(maxAllowed => {
        return maxAllowed
    })
}

export async function GET_WHITELIST_USER_REDEMPTION() {

    setWeb3Provider(W3)

    const owner = await W3.eth.getAccounts();

    return await CONTRACT.methods.getWhitelistUserRedemption(owner[0]).call().then(quantityRedeemed => {
        return quantityRedeemed
    })
}

export async function PRIVATE_WHITELIST_MINT(quantity) {

    setWeb3Provider(W3)

    const owner = await W3.eth.getAccounts();

    return await CONTRACT.methods.whitelistMint(quantity).send({
        from: owner[0],
        value: await multiplePrice(quantity)
    }).then(res => {
        console.log(res)
    }).catch(error => {
        console.log(error)
    })

    function multiplePrice(quantity) {

        return CONTRACT.methods.calculatePrice().call().then(price => {
            
            return price * quantity
        
        });
    }
}

//AIRDROP

export async function CHECK_AIRDROP_REMAINING() {

    setWeb3Provider(W3)

    return await CONTRACT.methods.remainingAirdrop().call().then(quantityRemaining => {
        return quantityRemaining
    })
}

export async function GET_AIRDROP_REMAINING_FOR_USER() {

    const owner = W3.eth.getAccounts();

    return await CONTRACT.methods.getAirdropEntitlementRemaining(owner[0]).call().then(leftToClaim => {
        return leftToClaim;
    })
}

export async function AIRDROP_MINT(quantity) {

    setWeb3Provider(W3)

    const owner = W3.eth.getAccounts();

    //no price - just gas fee
    return await CONTRACT.methods.airdropMint(quantity).send({
        from: owner[0]
    })
}

//PUBLIC

export async function REMAINING_PUBLIC_SUPPLY() {

    setWeb3Provider(W3)

    return await CONTRACT.methods.remainingPublic().call().then(quantityRemaining => {
        return quantityRemaining
    })
}

//may not need
export async function PUBLIC_SALE_MINT(quantity) {

    setWeb3Provider(W3)

    const owner = W3.eth.getAccounts();

    return await CONTRACT.methods.whitelistMint(quantity).send({
        from: owner[0],
        value: multiplePrice(quantity)
    }).then(res => {
        console.log(res)
    }).catch(error => {
        console.log(error)
    })

    function multiplePrice(quantity) {

        CONTRACT.methods.calculatePrice().call().then(price => {
            
            return (price * quantity)
        
        });
    }
}

//UNWRAP

export async function CHECK_IS_UNWRAPPED() {

    setWeb3Provider(W3)

    return await CONTRACT.methods.isUnwrapped().call().then(bool => {
        return bool
    })
}

export async function UNWRAP_TOKEN() {

    setWeb3Provider(W3)

    return await CONTRACT.methods.unwrapToken().call().then(res => {
        console.log(res);
    }).catch(error => {
        console.log(error)
    })
}
