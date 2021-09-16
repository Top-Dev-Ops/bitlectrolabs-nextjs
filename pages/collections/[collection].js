import Head from 'next/head'
import Link from 'next/link'

import { CollectionHero } from '../../components/hero'
import CollectionImages from '../../components/collection-images'
import CollectionSubHeading from '../../components/collection-sub-heading'
import CollectionCard from '../../components/collection-card'
import CollectionParagraph from '../../components/collection-paragraph'
import Social from '../../components/social'

import styles from '../../styles/collection.module.css'

import { Client } from '../../prismic-configuration'
import Prismic from 'prismic-javascript'

export default function Collection({ hero, overview, paragraph, statisticses, statisticss }) {
    
    return (
        <>
            <Head>
                <title>BitlectroLabs</title>
                <meta name="description" content="BitlectroLabs" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="w-100 collection">
                <CollectionHero hero={hero.data} />

                <CollectionImages />

                <CollectionSubHeading overview={overview.data} extraClassNames={'my-5 py-5'} />

                {statisticses.map(statistics => (
                    <CollectionCard
                        key={`collection_statistics_${statistics.uid}`}
                        heading={statistics.data.statistic_section_title[0].text}
                        categories={statistics.data.category}
                        extraClassNames={'my-5 py-5'}
                    />
                ))}
                
                {paragraph.data.additional_information.map((paragraph, index) => (
                    <CollectionParagraph
                        key={`collection_paragraph_${index}`}
                        heading={`${paragraph.additional_information_title[0].text}`}
                        content={paragraph.additional_information_body.map(item => item.text)}
                        extraClassNames={'mb-5 pb-5'}
                    />
                ))}

                <Link href="/gallery">
                    <section className={styles.collectionGallery}>
                        <h4 className="text-white">Gallery</h4>
                    </section>
                </Link>

                {/* SOCIALS, LOGO & TERMS OF USE */}
                <section className="row gx-0" style={{width: '96%', margin: '2vh 2% 2vh 2%'}}>
                    <div className="col-12 col-lg-4 mb-2 mb-lg-0">
                        <Social />
                    </div>

                    <div className="col-12 col-lg-4 mb-2 mb-lg-0 px-lg-3">
                        <div className="social d-flex justify-content-center align-items-center">
                        <p className="my-0" style={{fontSize: 'var(--subHeadingMd)', color: 'var(--midGray400)'}}>
                            ©BitlectroLabs 2021
                        </p>
                        </div>
                    </div>

                    <div className="col-12 col-lg-4 mb-2 mb-lg-0">
                        <div className="social d-flex justify-content-center align-items-center">
                        <p className="my-0" style={{fontSize: 'var(--subHeadingMd)', color: 'var(--midGray400)'}}>
                            Terms of Use
                        </p>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export async function getStaticPaths() {
    const collections = await Client().query(
        Prismic.Predicates.at('document.type', 'collection')
    )
    const paths = collections.results.map(collection => ({
        params: { collection: collection.data.collection_title[0].text}
    }))
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const heroes = await Client().query(
        Prismic.Predicates.at('document.type', 'hero_section')
    )

    const overviews = await Client().query(
        Prismic.Predicates.at('document.type', 'overview_section')
    )

    const paragraphs = await Client().query(
        Prismic.Predicates.at('document.type', 'paragraph_section')
    )

    const statisticss = await Client().query(
        Prismic.Predicates.at('document.type', 'statistics_section')
    )

    const hero = heroes.results.filter(item => item.data.collection_name[0].text === params.collection)[0]
    const overview = overviews.results.filter(item => item.data.collection_name[0].text === params.collection)[0]
    const paragraph = paragraphs.results.filter(item => item.data.collection_name[0].text === params.collection)[0]
    const statisticses = statisticss.results.filter(item => item.data.collection_name[0].text === params.collection)
    
    return {
        props: {
            hero,
            overview,
            paragraph,
            statisticses,
            statisticss
        }
    }
}