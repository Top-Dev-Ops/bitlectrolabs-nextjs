import React, { useState, useEffect } from 'react'
import GalleryFooter from '../../components/gallery-footer'
import GalleryList from '../../components/gallery-list'
import GalleryCollection from '../../components/gallery-collection'
import GalleryCard from '../../components/gallery-card'
// import MyPurchases from '../../components/my-purchases'

import { axiosDreamloops, axiosOpenSea } from '../../services/axios'

import styles from '../../styles/my-bitlectro.module.css'

import Web3 from 'web3'
import Web3Modal from 'web3modal'

export default function MyBitlectro({ attributes }) {
    const [left, setLeft] = useState(false)
    const [right, setRight] = useState(false)
    const [tokens, setTokens] = useState([])
    const [tokenSelected, setTokenSelected] = useState(null)
    const [showPurchases, setShowPurchases] = useState(false)

    //UNWRAP UI CONDITIONALS
    const [isUnwrapping, setIsUnwrapping] = useState(false); 

    useEffect(() => {
        const connectWallet = async () => {
            const web3Modal = new Web3Modal({
                network: 'mainnet',
                cacheProvider: true,
                providerOptions: {}
            })
    
            const provider = await web3Modal.connect()
            const web3 = new Web3(provider)
            const addresses = await web3.eth.getAccounts()

            const tokens = await axiosOpenSea.get(`/assets?owner=${addresses[0]}&asset_contract_address=0xf1B33aC32dbC6617f7267a349be6ebb004FeCcff`)
            //const tokens = await axiosOpenSea.get('/assets?owner=0xdCD0739CA8935f13f1253a6c5C95D406560e5f6E&asset_contract_address=0xf1B33aC32dbC6617f7267a349be6ebb004FeCcff')
                    
            setTokens(tokens.data.assets)
        }
        connectWallet()
    }, [])

    function UNWRAP(type, token_id) {
        //this for future proof call (Dreamloops vs Dreamers) unwrap
        if(type == 'Dreamloops') {
            //am unwrapping dreamloop
            setIsUnwrapping(true)
        }

        if(type == 'Dreamers') {
            setIsUnwrapping(true)
        }
    }

    return (
        <section className={tokenSelected !== null ? styles.myBitlectro : styles.gallery}>
            {tokenSelected ? (
                <>
                    {/* conditional render unwrap env INSIDE gallery-collection component */}
                    {/* this is kinda like a 'page' in traditional CRA */}
                    <GalleryCollection
                        extraClassNames="mb-5 mb-lg-0"
                        onClose={() => setTokenSelected(null)}
                        token={tokenSelected}
                        isUnwrapping={isUnwrapping}
                    />

                    <GalleryCard token={tokenSelected} UNWRAP={UNWRAP} />
                </>
            ) : (
                <>
                    <div className="text-center mb-4">
                        <h3
                            className="text-white text-center position-relative"
                            style={{zIndex: '3'}}
                        >
                            My Bitlectro
                        </h3>

                        <p>Below are the NFTs purchased by You.</p>
                        <p>Click “All purchases” to see full list.</p>
                    </div>

                    <GalleryList
                        left={left}
                        right={right}
                        tokens={tokens}
                        tokenSelect={setTokenSelected}
                    />

                    {/* <p className="text-white text-center mt-0 mt-lg-5">
                        Dreamloops #9361
                    </p> */}

                    <GalleryFooter
                        attributes={attributes}
                        onClickLeft={() => setLeft(!left)}
                        onClickRight={() => setRight(!right)}
                        onClickPurchases={() => setShowPurchases(true)}
                    />
                </>
            )}
        </section>
    )
}

export async function getStaticProps() {
    const attributes = await axiosDreamloops.get('/attributes')

    return {
        props: {
            attributes: attributes.data
        }
    }
}