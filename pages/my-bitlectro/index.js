import React, { useState } from 'react'
import GalleryFooter from '../../components/gallery-footer'
import GalleryList from '../../components/gallery-list'
import GalleryCollection from '../../components/gallery-collection'
import GalleryCard from '../../components/gallery-card'

import { axiosDreamloops, axiosOpenSea } from '../../services/axios'

import styles from '../../styles/my-bitlectro.module.css'

export default function MyBitlectro({ tokens }) {
    const [left, setLeft] = useState(false)
    const [right, setRight] = useState(false)
    const [tokenSelected, setTokenSelected] = useState(null)

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

export async function getStaticProps() {
    const openSeaUrl = await (await axiosDreamloops.get('/random_selection'))
        .data
        .slice(0, 20).map(tokenId => `token_ids=${tokenId}`)
        .join('&')

    const tokens = await axiosOpenSea.get(`/assets?${openSeaUrl}&asset_contract_address=0xf1B33aC32dbC6617f7267a349be6ebb004FeCcff`)

    return {
        props: {
            tokens: tokens.data.assets,
        }
    }
}