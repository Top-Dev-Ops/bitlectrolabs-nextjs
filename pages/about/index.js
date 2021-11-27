import { useEffect, useRef } from 'react'
import Head from 'next/head'
import LeftBorderedParagraph from '../../components/custom/LeftBorderedParagraph'
import Footer from '../../components/footer'
import Divider from '../../components/custom/Divider'

import { Client } from '../../prismic-configuration'
import Prismic from 'prismic-javascript'

import styles from '../../styles/about.module.css'

export default function About({
    banner,
    subtitle,
    contents
}) {

    const section = useRef()

    const onScroll = () => {
        const bottomPos = document.querySelector('.aboutHeroSection').getBoundingClientRect().bottom
        const imageHeight = document.querySelector('.aboutHeroImage').getBoundingClientRect().height
        
        if (bottomPos - imageHeight - 299 < 0) {
            document.querySelector('.aboutHeroImage').style.position = 'absolute'
            document.querySelector('.aboutHeroImage').style.top = `calc(100% - ${imageHeight}px - 120px)`
            document.querySelector('.aboutHeroImage').style.right = '0'
        } else {
            document.querySelector('.aboutHeroImage').style.position = 'fixed'
            document.querySelector('.aboutHeroImage').style.top = '179px'
            document.querySelector('.aboutHeroImage').style.right = '10%'
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <>
            <Head>
                <title>BitlectroLabs</title>
                <meta name="description" content="BitlectroLabs" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="w-100">
                <div className={`${styles.aboutHero}`}>
                    <div className="aboutHeroSection position-relative">
                        <div
                            className={`${styles.aboutHeroImage} aboutHeroImage`}
                            style={{backgroundImage: `url(${banner.data.about_banner_image.url})`}}
                        />

                        <div className="row m-0 p-0">
                            <div className={styles.aboutGradientText}>
                                {banner.data.about_banner_title[0].text}
                            </div>
                        </div>

                        <p className={styles.aboutMiddleText}>
                            {banner.data.about_banner_paragraph[0].text}
                        </p>
                    </div>

                    <div>
                        <LeftBorderedParagraph extraClassNames={'text-white'}>
                            {subtitle.data.about_subtitle_title[0].text}
                        </LeftBorderedParagraph>
                    </div>

                    <p className={styles.aboutMiddleText}>
                        {subtitle.data.about_subtitle_paragraph[0].text}
                    </p>
                </div>

                <section ref={section} className="whiteGraySection" style={{position: 'relative'}}>
                    {contents.data.about_content_group.map((content, index) => (
                        index % 2 === 0 ? (
                            <div key={`about_content_${index}`} className={styles.aboutWhiteSection}>
                                <div className="mb-5">
                                    <LeftBorderedParagraph>
                                        {content.about_content_group_title[0].text}
                                    </LeftBorderedParagraph>
                                </div>

                                <div>
                                    <p>
                                        {content.about_content_group_paragraph[0].text}
                                    </p>

                                    <Divider extraClassNames={'mb-4'} extraStyles={{ height: '4px', borderWidth: '4px', background: 'linear-gradient(0deg, #B788F3 0%, #6309D7 100%), #A050F6' }} />

                                    <p>
                                        {content.about_content_group_footer[0].text}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div key={`about_content_${index}`} className="aboutGraySection">
                                {/* <div className={styles.gradientSection}></div> */}

                                <div className={styles.aboutGraySection}>
                                    <div className={`${styles.aboutGraySection1} pb-5`}>
                                        <div>
                                            <LeftBorderedParagraph extraClassNames={'text-white'} width={'50%'}>
                                                {content.about_content_group_title[0].text}
                                            </LeftBorderedParagraph>
                                        </div>

                                        <p className="m-4" style={{ fontSize: '16px', color: '#ffffff' }}>
                                            {content.about_content_group_paragraph[0].text}
                                        </p>
                                    </div>

                                    <h4 className={styles.aboutGraySection2}>
                                        {content.about_content_group_footer[0].text}
                                    </h4>
                                </div>
                            </div>
                        )
                    ))}
                </section>

                <div className="footer-section w-100">
                    <div
                        className={styles.aboutEmailSection}
                        onClick={() => {
                            window.location.href = "mailto:admin@bitlectrolabs.com?subject=Contact us";
                        }}
                    >
                        <h3 className="text-white">admin@bitlectrolabs.com</h3>
                    </div>

                    {/* SOCIALS, LOGO & TEMS OF USE */}
                    <Footer />
                </div>
            </main>
        </>
    )
}

export async function getStaticProps() {
    const banner = await Client().query(
        Prismic.Predicates.at('document.type', 'about_banner')
    )

    const subtitle = await Client().query(
        Prismic.Predicates.at('document.type', 'about_subtitle')
    )

    const content = await Client().query(
        Prismic.Predicates.at('document.type', 'about_content')
    )

    return {
        props: {
            banner: banner.results[0],
            subtitle: subtitle.results[0],
            contents: content.results[0],
        }
    }
}