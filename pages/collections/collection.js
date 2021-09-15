import Head from 'next/head'
import Link from 'next/link'

import { CollectionHero } from '../../components/hero'
import CollectionImages from '../../components/collection-images'
import CollectionSubHeading from '../../components/collection-sub-heading'
import CollectionCard from '../../components/collection-card'
import CollectionParagraph from '../../components/collection-paragraph'
import Social from '../../components/social'

import styles from '../../styles/collection.module.css'

export default function Collection() {

    const redeemable = [
        {            
            heading: '10 “Mega Ultra Rares”',
            subHeading: 'Redeemable for both vinyl and cassette',
            percentage: 10,
            extraClassNames: 'mt-4'
        }, {
            heading: '91 “Extra Rares”',
            subHeading: 'Redeemable for cassettes (with rare traits)',
            percentage: 2,
            extraClassNames: 'mt-4',
        }, {
            heading: '100 “Super Rares”',
            subHeading: 'Redeemable for vinyl',
            percentage: 2,
            extraClassNames: 'mt-4',
        }, {
            heading: '1,799 “Rares”',
            subHeading: '1,799 “Rares”',
            percentage: 20,
            extraClassNames: 'mt-4',
        },
    ]

    const nonRedeemable = [
        {            
            heading: '12 “Secrets”',
            subHeading: 'Bitlectro Labs Team Dreamloops',
            percentage: 1,
            extraClassNames: 'mt-4'
        }, {
            heading: '24 “Extra Rares”',
            subHeading: 'Non-redeemable but with extremely rare elements',
            percentage: 2,
            extraClassNames: 'mt-4',
        }, {
            heading: '1,799 “Rares”',
            subHeading: 'Redeemable for cassettes',
            percentage: 70,
            extraClassNames: 'mt-4',
        },
    ]

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

                <CollectionSubHeading extraClassNames={'my-5 py-5'} />

                <CollectionCard
                    heading={'Redeemable NFTs - 2,000 Total'}
                    progresses={redeemable}
                    extraClassNames={'my-5 py-5'}
                />

                <CollectionCard
                    heading={'Non-Redeemable NFTs - 8,000 Total'}
                    progresses={nonRedeemable}
                    extraClassNames={'my-5 py-5'}
                />

                <CollectionParagraph
                    heading={'Feature Scarcity'}
                    content={[
                        'Visual elements within the artworks varied degrees of scarcity. Some elements will be found easily, while others may be featured on only a single Dreamloop. All Dreamloops will have some animated elements, a scrolling background for example, while less common Dreamloops will have unique animated foreground elements. Common Dreamloops are not redeemable for physical media. Additionally, each Dreamloop has a unique audio track and percussion combination.',
                        'Classes of scarcity are randomly assigned at the time of minting (creation). Dreamloops come in a “wrapped” state like a pack of baseball cards or a present. That is, each Dreamloops unique visual attributes and music are a mystery until the owner decides to unwrap their Dreamloop in our 3D unwrapping environment. Or if an owner chooses, they can keep their Dreamloop "wrapped" and resell or trade it on secondary markets like OpenSea. A wrapped dreamloops keeps its metadata a secret until it is unwrapped.'
                    ]}
                    extraClassNames={'my-5 py-5'}
                />

                <CollectionParagraph
                    heading={'Staking and Redemption Process'}
                    content={[
                        'Staking will occur by keeping your Dreamloops in a self-custodied Ethereum wallet (like MetaMask), which must be held at a single wallet address for a period of 182.5 days (six months). After this 182.5 days, users will receive an ERC20 redemption token. The counter on the staking period begins after a Dreamloop is unwrapped, and restarts whenever that Dreamloop has been transferred to a new user.',
                        'In order to receive a physical pressing, the staking token will need to be spent via a portal on our website, at which point we will ship the redeemed vinyl or cassette to the holder. There will be only 1 physical pressing made per redeemed NFT – making these one-off pressings unique and scarce.',
                    ]}
                    extraClassNames={'mb-5 pb-5'}
                />

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