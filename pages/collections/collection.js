import Head from 'next/head'

import { CollectionHero } from '../../components/hero'
import CollectionImages from '../../components/collection-images'

import styles from '../../styles/collection.module.css'

export default function Collection() {
    return (
        <>
            <Head>
                <title>BitlectroLabs</title>
                <meta name="description" content="BitlectroLabs" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="w-100 collection">
                <CollectionHero />

                <CollectionImages />

                <section className={styles.collectionSubHeadingLayout}>
                    <div className="row gx-0">
                        <div className="col-12 col-xl-8 offset-xl-2 text-center">
                            <h3>
                                As the first release from Bitlectro Labs, Dreamloops features programmatically generated 8-bit musical loops and 16-bit artwork produced by Keil Corcoran of the band STRFKR.
                            </h3>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}