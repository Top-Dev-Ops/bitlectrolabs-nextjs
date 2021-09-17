import Head from 'next/head'
import LeftBorderedParagraph from '../../components/custom/LeftBorderedParagraph'
import Social from '../../components/social'
import Divider from '../../components/custom/Divider'

import { Client } from '../../prismic-configuration'
import Prismic from 'prismic-javascript'

import styles from '../../styles/about.module.css'

export default function About({
    banner,
    subtitle,
    contents
}) {
    return (
        <>
            <Head>
                <title>BitlectroLabs</title>
                <meta name="description" content="BitlectroLabs" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="w-100">
                <div className={styles.aboutHero}>
                    <div
                        className="row m-0 p-0"
                        style={{backgroundImage: `${banner.data.about_banner_image.url}`}}
                    >
                        <div className={styles.aboutGradientText}>
                            {banner.data.about_banner_title[0].text}
                        </div>
                    </div>

                    <p className={styles.aboutMiddleText}>
                        {banner.data.about_banner_paragraph[0].text}
                    </p>

                    <div>
                        <LeftBorderedParagraph extraClassNames={'text-white'}>
                            {subtitle.data.about_subtitle_title[0].text}
                        </LeftBorderedParagraph>
                    </div>

                    <p className={styles.aboutMiddleText}>
                        {subtitle.data.about_subtitle_paragraph[0].text}
                    </p>
                </div>

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
                        <>
                            <div className={styles.gradientSection}></div>

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
                        </>
                    )
                ))}

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