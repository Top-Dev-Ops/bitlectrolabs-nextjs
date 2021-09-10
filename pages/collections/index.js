import Head from 'next/head'

import Social from '../../components/social'

import styles from '../../styles/collections.module.css'

export default function Collections() {
    return (
        <>
            <Head>
                <title>BitlectroLabs</title>
                <meta name="description" content="BitlectroLabs" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="w-100 vh-100 d-flex flex-column justify-content-between">
                <div className={`row gx-0 ${styles.collections}`}>
                    <div
                        className="col-12 col-lg-6 d-inline-flex px-lg-2 py-2"
                    >
                        <div className="w-100 h-100 d-inline-flex align-items-center justify-content-center" style={{background: 'var(--purpleGradient1)', borderRadius: '30px'}}>
                            <h2 className="text-white">Dreamloops</h2>
                        </div>
                    </div>
                    <div
                        className="col-12 col-lg-6 d-inline-flex px-lg-2 py-2"
                    >
                        <div className="w-100 h-100 d-inline-flex align-items-center justify-content-center" style={{background: 'var(--green800)', borderRadius: '30px'}}>
                            <h2 className="text-white">Dreamers</h2>
                        </div>
                    </div>
                    <div
                        className="col-12 col-lg-6 d-inline-flex px-lg-2 py-2"
                    >
                        <div className="w-100 h-100 d-inline-flex align-items-center justify-content-center" style={{background: 'var(--yellow800)', borderRadius: '30px'}}>
                            <h2 className="text-white">STRFKR</h2>
                        </div>
                    </div>
                </div>

                {/* SOCIALS, LOGO & TEMS OF USE */}
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