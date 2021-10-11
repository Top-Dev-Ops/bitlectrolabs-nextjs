import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'

import { toast } from 'react-toastify'
import detectEthereumProvider from '@metamask/detect-provider'

import Badge from '../custom/Badge'
import Divider from '../custom/Divider'
import { TextButton, SVGButton } from '../custom/Button'
import Plus from '../custom/svgs/Plus'
import Minus from '../custom/svgs/Minus'
import GalleryCardScroll from './gallery-card-scroll'

//DREAMERS

    //PUBLIC
    import { CHECK_PUBLIC_SWITCH, PUBLIC_SALE_MINT, REMAINING_PUBLIC_SUPPLY, CALCULATE_PRICE, CALCULATE_PRICE_MULTIPLE, GET_WHITELIST_MAX_ENTITLEMENT } from '../../services/dreamers';

    //DREAMLOOP
    import { CHECK_DREAMLOOP_SWITCH, DREAMLOOP_WHITELIST_MINT, CHECK_TOKEN_CLAIMED, GET_DREAM_USER_REDEEM_COUNT, CHECK_DREAMLOOP_OWNER, DREAMLOOP_BALANCE } from '../../services/dreamers'

    //WHITELIST - (PRESALE)
    import { CHECK_PRESALE_SWITCH, CHECK_WHITELIST_USER, GET_WHITELIST_USER_REDEMPTION, PRIVATE_WHITELIST_MINT} from '../../services/dreamers'

    //AIRDROP
    import { CHECK_AIRDROP_SWITCH, CHECK_AIRDROP_REMAINING } from '../../services/dreamers'

    //UNWRAP

    import { IS_DREAMLOOP_UNWRAPPED } from '../../services/dreamloops'

    //import { CHECK_IS_UNWRAPPED } from '../../services/dreamers'

export default function GalleryCard({
    extraClassNames,
    extraStyles,
    token,
    dreamloop,
    whitelist,
    //passed function from my-bitlectro
    UNWRAP,
}) {

    //seperate counts and match with UI buttons
    const [count, setCount] = useState(1)

    const [isDreamloopUnwrapped, setIsDreamloopWrapped] = useState(null);

    const [purchased, setPurchased] = useState(false)
    const router = useRouter()
    const galleryCard = useRef()

    const easeInOutSquad = function(t, b, c, d) {
        t /= d/2;
        if (t < 1) return c/2*t*t + b;
        t--;
        return -c/2 * (t*(t-2) - 1) + b;
    }

    //ui conditionals
    const [saleOn, setSaleOn] = useState(false);
    const [dreamOn, setDreamOn] = useState(false);
    const [preSaleOn, setPreSaleOn] = useState(false);
    const [airdropOn, setAirdropOn] = useState(false);

    const [soldOut, setSoldOut] = useState(false);

    const [onWhitelist, setOnWhitelist] = useState(false);
    
    //ui labels
    const [currentPrice, setCurrentPrice] = useState(null);
    const [currentTotal, setCurrentTotal] = useState(null);
    
    //dependant on # of loops in wallet
    const [dreamloopEntitlement, setDreamloopEntitlement] = useState(null);

    const [whitelistEntitlement, setWhitelistEntitlement] = useState(null);

    //token id for dreamloop mint
    const [tokenID, setTokenID] = useState(null);



    //ON PAGE LOAD CALLS
    useEffect(() => {

        if(router.pathname == '/buy') {

            //add another chain / mainnet check
            REMAINING_PUBLIC_SUPPLY().then(amount => {
                if(amount == 0) {
                    setSoldOut(true)
                } else {
                    setSoldOut(false)
                }
            })
    
            CALCULATE_PRICE().then(price => {
                //in ETH
                setCurrentPrice(price)
            })
    
            //PUBLICSALE UI GROUP

            //has public sale started?
            CHECK_PUBLIC_SWITCH().then(bool => {
                setSaleOn(bool)
            })
            
            //has airdrop claim started?
            CHECK_AIRDROP_SWITCH().then(bool => {
                setAirdropOn(bool)
            })
    
            //PRESALE UI GROUP

            //has dreamloop holder claim started?
            CHECK_DREAMLOOP_SWITCH().then(bool => {
                setDreamOn(bool)
            })

            //has whitelist presale started?
            CHECK_PRESALE_SWITCH().then(bool => {
                setPreSaleOn(bool)
            })

            updateWhitelistEntitlement()
            updateDreamloopEntitlement()
        } else {
            //if pathname isn't buy

            //gallery / my-bitlectro

            //DREAMLOOPS
            IS_DREAMLOOP_UNWRAPPED(token.token_id).then(bool => {
                //set to inverse to help with UI button render logic
                setIsDreamloopWrapped(!bool);
            })
        }

            CHECK_WHITELIST_USER().then(bool =>{
                setOnWhitelist(bool)
            })

    }, [])

    useEffect(() => {

        if(router.pathname == '/buy') {
            //only call on buy route
            CALCULATE_PRICE_MULTIPLE(count).then(total => {
                //in ETH
                setCurrentTotal(total)
            })
        }

    }, [count])

    //ENTITLEMENT UPDATES
    function updateWhitelistEntitlement() {
        //contract var for how many allowed per wallet for presale
        GET_WHITELIST_MAX_ENTITLEMENT().then(maxAllowed => {
            GET_WHITELIST_USER_REDEMPTION().then(redeemed => {
                setWhitelistEntitlement(maxAllowed - redeemed)
            })
        })
    }

    function updateDreamloopEntitlement() {
        //gets dreamloop mint entitled
        DREAMLOOP_BALANCE().then(balance => {
            GET_DREAM_USER_REDEEM_COUNT().then(redeemed => {
                if(balance > 2) {
                    setDreamloopEntitlement(2 - redeemed);
                } else {
                    setDreamloopEntitlement(balance - redeemed);
                }
            })
        })
    }

    //this a component
    function WhitelistTitle(props) {
        // let user_status = await CHECK_WHITELIST_USER()
        

        if (!props.preSaleOn) {
            return (<h4 className="mt-4 align-self-center" style={{color: '#FFFFFF'}}>Presale has not started.</h4>)
        }
        if (!props.onWhitelist) {
            return (<h4 className="mt-4 align-self-center" style={{color: '#FFFFFF'}}>Not On Whitelist</h4>)
        }
        else {
            return (<h4 className="mt-4 align-self-center" style={{color: '#FFFFFF'}}>Whitelist Credits: {props.whitelistEntitlement}</h4>)
        }
    }

    function DreamloopTitle(props){
        if (!props.dreamOn) {
            return (<h4 className="mt-4 align-self-center" style={{color: '#FFFFFF'}}>Dreamloop Presale has not started.</h4>)
        }
        if (!props.dreamloopEntitlement) {
            return (<h4 className="mt-4 align-self-center" style={{color: '#FFFFFF'}}>Dreamloop Credits: 0</h4>)
        }
        else {
            return (<h4 className="mt-4 align-self-center" style={{color: '#FFFFFF'}}>Dreamloop Credits: {props.dreamloopEntitlement}</h4>)
        }
    }

    function handleChange(e) {
        setTokenID(e.target.value)
    }

    const unwrapToken = () => {
        //console.log(token)
        UNWRAP_TOKEN(token.token_id)
    }

    const purchaseToken = async (type) => {
        if(type == 'public') {
            //PUBLIC MINT
        } else if(type == 'dreamloop') {
            //DREAMLOOP MINT

            let isOwner = await CHECK_DREAMLOOP_OWNER(tokenID);
            let isUnused = await CHECK_TOKEN_CLAIMED(tokenID);

            let amountRedeemed = await GET_DREAM_USER_REDEEM_COUNT();

            if((isOwner && isUnused) && amountRedeemed <= dreamloopEntitlement) {
                toast.promise(DREAMLOOP_WHITELIST_MINT(tokenID), {
                    pending: 'Dreamloop Holder Purchase',
                    success: 'Thank for purchasing!',
                    error: 'Purchase Failed...'
                }).then(res => {
                    updateDreamloopEntitlement()
                    console.log(res)
                }).catch(error => {
                    console.log(error)
                })
            } else {
                toast.error("Oops, out of claimable tokens!")
            }

        } else if(type == 'whitelist') {
            //WHITELIST MINT

            let isWhitelisted = await CHECK_WHITELIST_USER();

            let amountRedeemed = await GET_WHITELIST_USER_REDEMPTION();

            if((isWhitelisted) && whitelistEntitlement > 0) {
                toast.promise(PRIVATE_WHITELIST_MINT(count), {
                    pending: 'Purchasing from whitelist presale...',
                    success: `${count} Purchased, Thank You!`,
                    error: 'Purchase Failed...'
                }).then(res => {
                    updateWhitelistEntitlement()
                    console.log(res)
                }).catch(error => {
                    console.log(error)
                })
            } else {
                toast.error("Oops, out of claimable tokens!")
            }

        } else {
            //something went wrong! toast
            console.log('no type for purchase function')
        }
    }

    const galleryCardScroll = (scroll) => {
        if (scroll) {
            galleryCard.current.scrollTo({left: 0, top: galleryCard.current.scrollHeight, behavior: 'smooth'})
        } else {
            galleryCard.current.scrollTo({left: 0, top: 0, behavior: 'smooth'})
        }
    }

    return (
        <section
            className={`gallery-card h-100 ${extraClassNames}`}
            style={extraStyles}
        >
            <div
                className="d-flex w-100 flex-column position-relative"
                style={{height: '20%'}}
            >
                {
                    token &&
                    <>
                        <h3>ID: {token.token_id}</h3>
                        <p>{token.collection.name}</p>

                        <div>
                            {token.owner.user !== null && (
                                <Badge
                                    text={token.owner.user.username}
                                    extraClassNames="mx-1 d-inline-block"
                                    size="Lg"
                                />
                            )}
                        </div>
                    </>
                }

                <GalleryCardScroll onClick={galleryCardScroll} />
            </div>

            {router.pathname !== '/buy' ? (
                <div className="w-100 mt-4 d-flex flex-column" style={{height: '80%'}}>
                    <div
                        className="w-100 d-flex flex-column my-5 my-lg-0 overflow-hidden"
                        ref={galleryCard}
                        style={{height: '75%'}}
                    >
                        {token.traits.map((trait, index) => (
                            <div key={`gallery_card_${trait.trait_count}_${index}`}>
                                <div className="d-flex justify-content-between">
                                    <p className="text-capitalize">
                                        {trait.trait_type}
                                    </p>
                                    <p className="text-white">
                                        {trait.value}
                                    </p>
                                </div>

                                {index !== token.traits.length - 1 && (
                                    <Divider extraClassNames="mb-3" />
                                )}
                            </div>
                        ))}
                        <p className="text-white">{token.description}</p>
                    </div>

                    <div className="w-100 d-flex flex-column justify-content-end" style={{height: '25%'}}>
                        {/* only show unwrap on "my-bitlectro" */}
                        {/* TODO - IS TOKEN WRAPPED */}
                        {(router.pathname == '/my-bitlectro') &&
                            <>
                                {(isDreamloopUnwrapped && (token.collection.name == 'Dreamloops')) && 
                                
                                    <TextButton
                                        text={'Unwrap Dreamloop'}
                                        variant={'secondary'}
                                        extraClassNames="w-100 mb-2"
                                        onClick={() => UNWRAP(token.collection.name, token.token_id)}
                                    />
                                }
                            </>
                        }

                        <TextButton
                            text={'View on OpenSea'}
                            variant={'primary'}
                            extraClassNames="w-100"
                            onClick={() => window.open(token.permalink, '_blank')}
                        />
                    </div>
                </div>
            ) : (
                //SALE PAGE
                <>
                    {saleOn ? (
                        //PUBLIC SALE
                        <>
                            <div className="d-flex flex-column">
                                <h4 style={{color: '#FFFFFF'}}>Public Sale</h4>
                                <p>*max 5 Dreamers per transaction</p>
                            </div>

                            <div className="w-100">
                                <div className="w-100 d-flex justify-content-between my-5">
                                    <span style={{fontSize: 'var(--textMd)', color: 'var(--midGray400)'}}>
                                        Current price
                                    </span>
                                    <span style={{fontSize: 'var(--textMd)', color: 'var(--pureWhite)'}}>
                                        {currentPrice}
                                    </span>
                                </div>

                                <div className="w-100 d-flex justify-content-between align-items-center my-5">
                                    <SVGButton
                                        extraClassNames="custom-button-svg-num"
                                        icon={<Minus />}
                                        onClick={() => setCount(count === 1 ? 1 : count-1)}
                                    />
                                    <h1 className="my-0" style={{color: 'var(--pureWhite)', fontSize: 'var(--subHeadingLg)'}}>
                                        {count}
                                    </h1>
                                    <SVGButton
                                        extraClassNames="custom-button-svg-num"
                                        icon={<Plus />}
                                        onClick={() => setCount(count + 1)}
                                    />
                                </div>

                                <Divider extraClassNames="my-5" />

                                <div className="w-100 d-flex justify-content-between my-5">
                                    <span style={{fontSize: 'var(--textMd)', color: 'var(--midGray400)'}}>
                                        Total price
                                    </span>
                                    <span style={{fontSize: 'var(--textMd)', color: 'var(--pureWhite)'}}>
                                        {currentTotal}
                                    </span>
                                </div>

                                <div className="w-100 d-flex justify-content-end my-5">
                                    <span style={{fontSize: 'var(--textMd)', color: 'var(--midGray400)'}}>
                                        + gas
                                    </span>
                                </div>
                            </div>

                            {purchased && (
                                <div className="purchase-message">
                                    <p>Thank you for your purchase!</p>
                                </div>
                            )}

                            <TextButton
                                text={'Purchase'}
                                variant={'tertiary'}
                                extraClassNames="w-100"
                                onClick={purchaseToken('public')}
                            />

                            <a style={{color: '#7C808A'}} href='https://pastebin.com/raw/mfcQUZRm' rel='noreferrer' target='_blank'>
                                    terms of service
                                    </a>
                        </>
                    ) : (
                        //WHITELISTS (DREAMLOOPS & WHITELIST)
                        <>
                            {/* DREAMLOOPS PRESALE */}
                            {dreamloop &&
                                <>
                                    <div className="d-flex flex-column w-100">
                                        <h4 style={{color: '#FFFFFF'}}>Dreamloops Holders</h4>
                                        <p>*limited to one Dreamer per transaction to a maximum of 2 per wallet.</p>

                                        <DreamloopTitle 
                                            // pass the things you need here
                                            dreamOn={dreamOn}
                                            dreamloopEntitlement={dreamloopEntitlement}
                                        />

                                        {/* <h4 className="mt-4 align-self-center" style={{color: '#FFFFFF'}}>{`${dreamloopEntitlement} More Allowed`}</h4> */}

                                        <h5 className="align-self-center mt-5" style={{color: '#666666'}}>Enter Dreamloop Token # that you own.</h5>
                                        <h5 className="align-self-center mt-5" style={{color: '#666666'}}>(It can only be used once)</h5>
                                        <div className="subscribe-button align-self-center mt-2">
                                            {/* INPUT */}
                                            <input
                                                type='text'
                                                style={{
                                                    borderRadius: '40px',
                                                    borderColor: 'var(--midGray900)',
                                                    backgroundColor: 'var(--midGray900)',
                                                    padding: '15px',
                                                    paddingLeft: '20px',
                                                    paddingRight: '20px',
                                                    textAlign: 'center'
                                                }}
                                                placeholder='Dreamloop ID'
                                                onChange={handleChange}
                                            />
                                        </div>

                                    </div>

                                    <div className="w-100 mt-4">
                                        <div className="w-100 d-flex justify-content-between my-3">
                                            <span style={{fontSize: 'var(--textMd)', color: 'var(--midGray400)'}}>
                                                Cost per
                                            </span>
                                        
                                            <span style={{fontSize: 'var(--textLg)', color: 'var(--pureWhite)'}}>
                                                {currentPrice}
                                            </span>
                                        </div>

                                        <Divider extraClassNames="my-3" />

                                        <div className="w-100 d-flex justify-content-end my-3">
                                            <span style={{fontSize: 'var(--textMd)', color: 'var(--midGray400)'}}>
                                                + gas
                                            </span>
                                        </div>
                                    </div>

                                    {purchased && (
                                        <div className="purchase-message">
                                            <p>Thank you for your purchase!</p>
                                        </div>
                                    )}

                                    <TextButton
                                        text={'Purchase Dreamer'}
                                        variant={'tertiary'}
                                        extraClassNames="w-100 mt-4"
                                        onClick={() => purchaseToken('dreamloop')}
                                    />

                                    <a style={{color: '#7C808A'}} href='https://pastebin.com/raw/mfcQUZRm' rel='noreferrer' target='_blank'>
                                    terms of service
                                    </a>
                                </>
                            }

                            {/* WHITELIST PRESALE */}
                            {whitelist &&
                                <>
                                    <div className="d-flex flex-column w-100">
                                        <h4 style={{color: '#FFFFFF'}}>Whitelist Presale</h4>
                                        <p>{`*max 3 Dreamers per whitelisted wallet`}</p>

                                        <WhitelistTitle 
                                            // pass the things you need here
                                            preSaleOn={preSaleOn}
                                            onWhitelist={onWhitelist}
                                            whitelistEntitlement={whitelistEntitlement}
                                        />

                                    </div>

                                    <div className="w-100">
                                        <div className="w-100 d-flex justify-content-between my-5">
                                            <span style={{fontSize: 'var(--textMd)', color: 'var(--midGray400)'}}>
                                                Current price
                                            </span>
                                            <span style={{fontSize: 'var(--textMd)', color: 'var(--pureWhite)'}}>
                                                {currentPrice}
                                            </span>
                                        </div>

                                        <div className="w-100 d-flex justify-content-between align-items-center my-5">
                                            <SVGButton
                                                extraClassNames="custom-button-svg-num"
                                                icon={<Minus />}
                                                onClick={() => setCount(count === 1 ? 1 : count-1)}
                                            />
                                            <h1 className="my-0" style={{color: 'var(--pureWhite)', fontSize: 'var(--subHeadingLg)'}}>
                                                {count}
                                            </h1>

                                            {(count < whitelistEntitlement) ?  (
                                                <SVGButton
                                                    extraClassNames="custom-button-svg-num"
                                                    icon={<Plus />}
                                                    onClick={() => setCount(count + 1)}
                                                />
                                            ) : (
                                                <SVGButton
                                                    extraClassNames="custom-button-svg-num"
                                                    icon={<Plus />}
                                                />
                                            )}
                                        </div>

                                        <Divider extraClassNames="my-5" />

                                        <div className="w-100 d-flex justify-content-between my-5">
                                            <span style={{fontSize: 'var(--textMd)', color: 'var(--midGray400)'}}>
                                                Total price
                                            </span>
                                            <span style={{fontSize: 'var(--textMd)', color: 'var(--pureWhite)'}}>
                                                {currentTotal}
                                            </span>
                                        </div>

                                        <div className="w-100 d-flex justify-content-end my-5">
                                            <span style={{fontSize: 'var(--textMd)', color: 'var(--midGray400)'}}>
                                                + gas
                                            </span>
                                        </div>
                                    </div>

                                    {purchased && (
                                        <div className="purchase-message">
                                            <p>Thank you for your purchase!</p>
                                        </div>
                                    )}

                                    <TextButton
                                        text={'Purchase Dreamer(s)'}
                                        variant={'tertiary'}
                                        extraClassNames="w-100"
                                        onClick={() => purchaseToken('whitelist')}
                                    />

                                    <a style={{color: '#7C808A'}} href='https://pastebin.com/raw/mfcQUZRm' rel='noreferrer' target='_blank'>
                                    terms of service
                                    </a>
                                </>
                            }
                        
                        </>
                    )}
                </>
            )}
        </section>
    )
}