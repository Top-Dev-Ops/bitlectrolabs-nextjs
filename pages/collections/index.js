import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

import Footer from '../../components/footer'
import { Client } from '../../prismic-configuration'
import Prismic from 'prismic-javascript'

import styles from '../../styles/collections.module.css'

const bgColors = [
    'var(--purpleGradient1)',
    'var(--green900)',
    'var(--yellow900)'
]

export default function Collections({ collections }) {

    const [height, setHeight] = useState('0%')

    useEffect(() => {
        if (window.innerWidth < 992) {  // mobile
            setHeight(`${parseInt(100 / collections.length)}%`)
        } else {                        // desktop
            setHeight(`${parseInt(100 / Math.round(collections.length / 2))}%`)
        }
        
    }, [])

    return (
        <>
            <Head>
                <title>BitlectroLabs</title>
                <meta name="description" content="BitlectroLabs" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="w-100 vh-100 d-flex flex-column justify-content-between">
                <div className={`row gx-0 ${styles.collections}`}>
                    {collections.map((collection, index) => (
                        <div
                            key={`collections_${collection.uid}`}
                            className="col-12 col-lg-6 d-inline-flex px-lg-2 py-2"
                            style={{height}}
                        >
                            <Link href={`/collections/${collection.data.collection_title[0].text}`}>
                                <div
                                    className="w-100 h-100 d-inline-flex align-items-center justify-content-center"
                                    style={{background: bgColors[index % 3], borderRadius: '30px', maxHeight: '400px'}}
                                >
                                    <h2 className="text-white">{collection.data.collection_title[0].text}</h2>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>

                {/* SOCIALS, LOGO & TEMS OF USE */}
                <Footer />
            </main>
        </>
    )
}

export async function getStaticProps() {
    const collections = await Client().query(
        Prismic.Predicates.at('document.type', 'collection')
    )

    return {
        props: {
            collections: collections.results
                .sort((a, b) => new Date(a.first_publication_date) - new Date(b.first_publication_date))
        }
    }
}