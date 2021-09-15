import Head from 'next/head'
import LeftBorderedParagraph from '../../components/custom/LeftBorderedParagraph'
import Social from '../../components/social'
import Divider from '../../components/custom/Divider'
import styles from '../../styles/about.module.css'

export default function About() {

    return (
        <>
            <Head>
                <title>BitlectroLabs</title>
                <meta name="description" content="BitlectroLabs" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="w-100">
                <div className={styles.aboutHero}>
                    <div className="row m-0 p-0">
                        <div className={styles.aboutGradientText}>
                            Bitlectro Labs is a team of developers, artists, and blockchain experts who aim to bring unique audio-visual NFTs to the growing world of digital art and collectibles
                        </div>
                    </div>

                    <p className={styles.aboutMiddleText}>
                        While digital imagery represents the majority of current NFTs, music based NFTs are still in their infancy. Bitlectro Labs aims to carve a corner in the NFT space focused upon bringing musicians and collectors together in this emerging digital space.
                    </p>

                    <div>
                        <LeftBorderedParagraph extraClassNames={'text-white'}>
                            Bringing further utility to NFT collections in the form of gaming, DeFi integrations, and collection specific creative commons licensing
                        </LeftBorderedParagraph>
                    </div>

                    <p className={styles.aboutMiddleText}>
                        When you own a Bitlectro Labs NFT, you own the rights to utilize the music in media you create (e.g., YouTube, Podcasts, Twitch, etc.)
                    </p>
                </div>

                <div className={styles.aboutWhiteSection}>
                    <div className="mb-5">
                        <LeftBorderedParagraph>
                            Upcoming releases will feature curated artists and musicians, and vary in project size, scarcity, and aesthetic
                        </LeftBorderedParagraph>
                    </div>

                    <div>
                        <p>
                            By producing collections made by artists and musicians from different musical genres and visual aesthetics, we aim to make our NFT collections a novel way to collect and experience music
                        </p>

                        <Divider extraClassNames={'mb-4'} extraStyles={{ height: '4px', borderWidth: '4px', background: 'linear-gradient(0deg, #B788F3 0%, #6309D7 100%), #A050F6' }} />

                        <p>
                            Some collections will be redeemable for physical copies, for example, vinyl records or cassette tapes
                        </p>
                    </div>
                </div>

                <div className={styles.gradientSection}></div>

                <div className={styles.aboutGraySection}>
                    <div className={`${styles.aboutGraySection1} pb-5`}>
                        <div>
                            <LeftBorderedParagraph extraClassNames={'text-white'} width={'50%'}>
                                As the catalog of releases grows, we expect collectors to resell and trade* our NFTs peer to peer, creating a network and community of fans
                            </LeftBorderedParagraph>
                        </div>

                        <p className="m-4" style={{ fontSize: '16px', color: '#ffffff' }}>
                            *both the physical copies and the NFTs
                        </p>
                    </div>

                    <h4 className={styles.aboutGraySection2}>
                        With music distribution models changing due to the advent of streaming services, Bitlectro Labs has created a unique music distribution model within the NFT ecosystem
                    </h4>
                </div>

                <div className={styles.aboutEmailSection}>
                    <h3 className="text-white">admin@bitlectrolabs.com</h3>
                </div>

                {/* SOCIALS, LOGO & TEMS OF USE */}
                <section className="row gx-0" style={{ width: '96%', margin: '2vh 2% 2vh 2%' }}>
                    <div className="col-12 col-lg-4 mb-2 mb-lg-0">
                        <Social />
                    </div>

                    <div className="col-12 col-lg-4 mb-2 mb-lg-0 px-lg-3">
                        <div className="social d-flex justify-content-center align-items-center">
                            <p className="my-0" style={{ fontSize: 'var(--subHeadingMd)', color: 'var(--midGray400)' }}>
                                ©BitlectroLabs 2021
                            </p>
                        </div>
                    </div>

                    <div className="col-12 col-lg-4 mb-2 mb-lg-0">
                        <div className="social d-flex justify-content-center align-items-center">
                            <p className="my-0" style={{ fontSize: 'var(--subHeadingMd)', color: 'var(--midGray400)' }}>
                                Terms of Use
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}