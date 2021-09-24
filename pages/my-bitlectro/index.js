import React, { useState, useEffect } from 'react'
import GalleryFooter from '../../components/gallery-footer'
import GalleryList from '../../components/gallery-list'
import GalleryCollection from '../../components/gallery-collection'
import GalleryCard from '../../components/gallery-card'

import { axiosOpenSea } from '../../services/axios'

import styles from '../../styles/my-bitlectro.module.css'

import Web3 from 'web3'
import Web3Modal from 'web3modal'

export default function MyBitlectro() {
    const [left, setLeft] = useState(false)
    const [right, setRight] = useState(false)
    const [tokens, setTokens] = useState([])
    const [tokenSelected, setTokenSelected] = useState(null)

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
            // const tokens = await axiosOpenSea.get('/assets?owner=0xdCD0739CA8935f13f1253a6c5C95D406560e5f6E&asset_contract_address=0xf1B33aC32dbC6617f7267a349be6ebb004FeCcff')
            setTokens(tokens.data.assets)
        }
        connectWallet()
    }, [])

    return (
        <section className={tokenSelected !== null ? styles.myBitlectro : styles.gallery}>
            {tokenSelected ? (
                <>
                    <GalleryCollection
                        extraClassNames="mb-5 mb-lg-0"
                        onClose={setTokenSelected}
                        token={tokenSelected}
                    />
                    <GalleryCard
                        token={tokenSelected}
                    />
                </>
            ) : (
                <>
                    <div className="text-center">
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
                        extraClassNames={'my-5'}
                        left={left}
                        right={right}
                        tokens={tokens}
                        tokenSelect={setTokenSelected}
                    />

                    <p className="text-white text-center pt-0 pt-sm-5 pt-md-5 mt-5 pt-xl-0 mt-xl-0">
                        Dreamloops #9361
                    </p>

                    <GalleryFooter
                        onClickLeft={() => setLeft(!left)}
                        onClickRight={() => setRight(!right)}
                    />
                </>
            )}
            
        </section>
    )
}

// export async function getStaticProps() {
//     const openSeaUrl = await (await axiosDreamloops.get('/random_selection'))
//         .data
//         .slice(0, 20).map(tokenId => `token_ids=${tokenId}`)
//         .join('&')

//     const tokens = await axiosOpenSea.get(`/assets?${openSeaUrl}&asset_contract_address=0xf1B33aC32dbC6617f7267a349be6ebb004FeCcff`)

//     return {
//         props: {
//             tokens: tokens.data.assets,
//         }
//     }
// }