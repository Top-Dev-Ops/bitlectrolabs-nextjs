import Head from 'next/head'
import Link from 'next/link'

import { CollectionHero } from '../../components/hero'
import CollectionImages from '../../components/collection-images'
import CollectionSubHeading from '../../components/collection-sub-heading'
import CollectionCard from '../../components/collection-card'
import CollectionParagraph from '../../components/collection-paragraph'
import Footer from '../../components/footer'

import styles from '../../styles/collection.module.css'

import { Client } from '../../prismic-configuration'
import Prismic from 'prismic-javascript'

import { axiosDreamloops, axiosOpenSea } from '../../services/axios'

export default function Collection({
    hero,
    overview,
    paragraph,
    statisticses,
    tokens
}) {
    return (
        <>
            <Head>
                <title>BitlectroLabs</title>
                <meta name="description" content="BitlectroLabs" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.collection}>
                <div className={styles.collectionCard}>
                    <CollectionHero hero={hero.data} />

                    <CollectionImages
                        images={tokens.length > 0 ? tokens.map(token => token.image_original_url) : []}
                    />

                    <CollectionSubHeading
                        overview={overview.data}
                        extraClassNames={'my-5 py-5'}
                    />

                    {statisticses.length > 0 && statisticses.map(statistics => (
                        <CollectionCard
                            key={`collection_statistics_${statistics.uid}`}
                            heading={statistics.data.statistic_section_title[0].text}
                            categories={statistics.data.category}
                            extraClassNames={'my-5 py-5'}
                        />
                    ))}
                    
                    {paragraph.data !== undefined && paragraph.data.additional_information.map((paragraph, index) => (
                        <CollectionParagraph
                            key={`collection_paragraph_${index}`}
                            heading={`${paragraph.additional_information_title[0].text}`}
                            content={paragraph.additional_information_body.map(item => item.text)}
                            extraClassNames={'mb-5 pb-5'}
                        />
                    ))}
                </div>

                <Link href="/gallery">
                    <section className={styles.collectionGallery}>
                        <h4 className="text-white">Gallery</h4>
                    </section>
                </Link>

                {/* SOCIALS, LOGO & TERMS OF USE */}
                <Footer />
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

    const heroImage = await Client().query(
        Prismic.Predicates.at('document.type', 'hero_images')
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

    const hero = heroes.results.filter(item => item.data.collection_name[0].text === params.collection)
    const heroImages = heroImage.results.filter(item => item.data.collection_name[0].text === params.collection)
    const overview = overviews.results.filter(item => item.data.collection_name[0].text === params.collection)
    const paragraph = paragraphs.results.filter(item => item.data.collection_name[0].text === params.collection)
    const statisticses = statisticss.results.filter(item => item.data.collection_name[0].text === params.collection)

    const openSeaUrl = await (await axiosDreamloops.get('/random_selection'))
        .data
        .slice(0, 20).map(tokenId => `token_ids=${tokenId}`)
        .join('&')

    const tokens = await axiosOpenSea.get(`/assets?${openSeaUrl}&asset_contract_address=0xf1B33aC32dbC6617f7267a349be6ebb004FeCcff`)
    
    return {
        props: {
            hero: hero.length > 0 ? hero[0] : [],
            overview: overview.length > 0 ? overview[0] : [],
            paragraph: paragraph.length > 0 ? paragraph[0] : [],
            heroImages,
            statisticses,
            tokens: tokens.data.assets,
        }
    }
}