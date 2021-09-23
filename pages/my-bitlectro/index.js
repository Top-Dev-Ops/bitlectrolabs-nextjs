import React, { useState } from 'react'
import GalleryFooter from '../../components/gallery-footer'
import GalleryList from '../../components/gallery-list'
import GalleryCollection from '../../components/gallery-collection'
import GalleryCard from '../../components/gallery-card'

import styles from '../../styles/my-bitlectro.module.css'

export default function MyBitlectro() {
    const [left, setLeft] = useState(false)
    const [right, setRight] = useState(false)
    const [tokenSelected, setTokenSelected] = useState(false)

    return (
        <section className={tokenSelected ? styles.myBitlectro : styles.gallery}>
            {tokenSelected ? (
                <>
                    <GalleryCollection
                        extraClassNames="mb-5 mb-lg-0"
                        onClose={() => setTokenSelected(false)}
                    />
                    <GalleryCard />
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
                        tokenSelect={() => setTokenSelected(true)}
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