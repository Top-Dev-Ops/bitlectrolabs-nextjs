import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { CollectionHero } from '../../components/hero'
import CollectionImages from '../../components/collection-images'
import CollectionSubHeading from '../../components/collection-sub-heading'
import CollectionCard from '../../components/collection-card'
import CollectionParagraph from '../../components/collection-paragraph'
import CollectionRoadmap from '../../components/collection-roadmap'
import Footer from '../../components/footer'

import styles from '../../styles/collection.module.css'

import { Client } from '../../prismic-configuration'
import Prismic from 'prismic-javascript'

import { axiosDreamloops, axiosOpenSea } from '../../services/axios'

export default function Collection({
    hero,
    bodies,
    overview,
    paragraph,
    statisticses,
    roadmaps,
    tokens,
}) {
    const router = useRouter()
    const dreamImages = Array.from(Array(6)).map((e, i) => `/images/Dreamers/${i}.gif`)

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
                        images={router.query.collection === 'Dreamers' ? dreamImages : tokens.length > 0 ? tokens.map(token => token.image_original_url) : []}
                    />

                    <CollectionSubHeading
                        data={overview.data}
                        extraClassNames={'my-5 py-5'}
                    />

                    {statisticses.length > 0 && statisticses.map((statistics, index) => (
                        <CollectionCard
                            key={`collection_statistics_${statistics.uid}`}
                            heading={statistics.data.statistic_section_title[0].text}
                            categories={statistics.data.category}
                        />
                    ))}
                    
                    {paragraph.data !== undefined && paragraph.data.section_title.length > 0 && (
                        <h3 style={{color: 'var(--green900)'}}>{paragraph.data.section_title[0].text}</h3>
                    )}
                    {paragraph.data !== undefined && paragraph.data.additional_information.map((paragraph, index) => (
                        <CollectionParagraph
                            key={`collection_paragraph_${index}`}
                            heading={`${paragraph.additional_information_title[0].text}`}
                            content={paragraph.additional_information_body.map(item => item.text)}
                            extraClassNames={'mb-5'}
                        />
                    ))}

                    
                    {bodies.length > 0 && (
                        <CollectionSubHeading
                            data={bodies[0].data}
                            extraClassNames={'my-5'}
                        />
                    )}
                    
                    {router.query.collection === 'Dreamers' && (
                        <img src="/images/dreamers.png" className="w-100 h-auto mb-5 pb-5" />
                    )}

                    {roadmaps.map(roadmap => (
                        <CollectionRoadmap
                            key={`collection_roadmap_${roadmap.id}`}
                            data={roadmap.data}
                            extraClassNames="my-5"
                        />
                    ))}

                    {bodies.length > 1 && bodies.map((body, index) => index > 0 ? (
                        <CollectionSubHeading
                            key={`collection_body_${body.id}`}
                            data={body.data}
                            extraClassNames={'my-5'}
                        />
                    ) : undefined)}
                </div>


                {/* <Link href="/gallery">
                    <section
                        className={styles.collectionGallery}
                        style={{
                            background: `${router.query.collection === 'Dreamers' ? 'var(--green900)' : 'var(--purpleGradient1)'}`
                        }}
                    >
                        <h4 className="text-white">Gallery</h4>
                    </section>
                </Link> */}

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

    const bodySection = await Client().query(
        Prismic.Predicates.at('document.type', 'body_section')
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

    const roadmapes = await Client().query(
        Prismic.Predicates.at('document.type', 'collection_roadmap')
    )

    const hero = heroes.results.filter(item => item.data.collection_name[0].text === params.collection)
    const bodies = bodySection.results.filter(item => item.data.collection_name[0].text === params.collection)
    const heroImages = heroImage.results.filter(item => item.data.collection_name[0].text === params.collection)
    const overview = overviews.results.filter(item => item.data.collection_name[0].text === params.collection)
    const paragraph = paragraphs.results.filter(item => item.data.collection_name[0].text === params.collection)
    const statisticses = statisticss.results.filter(item => item.data.collection_name[0].text === params.collection)
    const roadmaps = roadmapes.results.filter(item => item.data.collection_name[0].text === params.collection)

    const openSeaUrl = await (await axiosDreamloops.get('/random_selection'))
        .data
        .slice(0, 20).map(tokenId => `token_ids=${tokenId}`)
        .join('&')

    const tokens = await axiosOpenSea.get(`/assets?${openSeaUrl}&asset_contract_address=0xf1B33aC32dbC6617f7267a349be6ebb004FeCcff`)
    
    return {
        props: {
            hero: hero.length > 0 ? hero[0] : [],
            bodies: bodies.length > 0 ? bodies.sort((a, b) => new Date(a.first_publication_date) - new Date(b.first_publication_date)) : [],
            overview: overview.length > 0 ? overview[0] : [],
            paragraph: paragraph.length > 0 ? paragraph[0] : [],
            heroImages,
            statisticses,
            roadmaps,
            tokens: tokens.data.assets,
        }
    }
}