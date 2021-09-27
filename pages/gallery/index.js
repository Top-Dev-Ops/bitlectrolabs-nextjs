import { useState, useEffect, useRef } from 'react'

import Head from 'next/head'

import GalleryFooter from '../../components/gallery-footer'
import ThreeApp from '../../components/gallery-grid'
import GalleryList from '../../components/gallery-list'
import { axiosDreamloops, axiosOpenSea } from '../../services/axios'

import styles from '../../styles/gallery.module.css'

export default function Gallery({ tokens, attributes }) {
    const [app, setApp] = useState(null)
    const [view, setView] = useState(true)
    const [left, setLeft] = useState(false)
    const [right, setRight] = useState(false)
    const [up, setUp] = useState('')
    const [down, setDown] = useState('')
    
    const containerRef = useRef(null)

    useEffect(() => {
        if (app) return
        if (!containerRef.current) return
        const _app = new ThreeApp(containerRef.current)
        const threeAppStart = async () => {
            _app.setData(tokens);
            _app.start()
            _app.resize()
            _app.renderer.domElement.style.display = 'block'
            setApp(_app)
        }
        threeAppStart()
    }, [])

    useEffect(() => {
        if (!app) return
        if (view) {
            app.renderer.domElement.style.display = 'block'
        } else {
            app.renderer.domElement.style.display = 'none'
        }
    }, [view])

    useEffect(() => {
        if(!app) return;
        app.keyController.mouseUp();
        setDown('')
    }, [up])

    useEffect(() => {
        if(!app) return;
        app.keyController.mouseDown(down)
        setUp('')
    }, [down])

    return (
        <>
            <Head>
                <title>BitlectroLabs</title>
                <meta name="description" content="BitlectroLabs" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <section className={`${styles.gallery} ${view ? 'justify-content-between' : undefined}`} ref={containerRef}>
                <div className="text-center">
                    <h3
                        className="text-white text-center position-relative mb-5"
                        style={{zIndex: '3'}}
                    >
                        Dreamloops
                    </h3>

                    {/* <h4 className={styles.galleryNotFound}>We couldn't find anything</h4>

                    <p className={styles.galleryResetFilter}>Reset filter</p> */}
                </div>

                {view ? (
                    <div className={styles.galleryTopGradientBackground} />
                ) : (
                    <GalleryList
                        left={left}
                        right={right}
                        tokens={tokens}
                        tokenSelect={() => {}}
                    />
                )}

                {/* <p
                    className="text-white text-center pt-0 pt-sm-5 pt-md-5 mt-5 pt-xl-0 mt-xl-0"
                    style={{zIndex: `${view ? '3' : undefined}`}}
                >
                    #9361
                </p> */}

                <GalleryFooter
                    view={view}
                    attributes={attributes}
                    changeView={() => setView(!view)}
                    onClickLeft={() => setLeft(!left)}
                    onClickRight={() => setRight(!right)}
                    onMouseDown={(arrow) => setDown(arrow)}
                    onMouseUp={(arrow) => setUp(arrow)}
                />
            </section>
        </>
    )
}

export async function getStaticProps() {
    const attributes = await axiosDreamloops.get('/attributes')

    const openSeaUrl = await (await axiosDreamloops.get('/random_selection'))
        .data
        .slice(0, 20).map(tokenId => `token_ids=${tokenId}`)
        .join('&')

    const tokens = await axiosOpenSea.get(`/assets?${openSeaUrl}&asset_contract_address=0xf1B33aC32dbC6617f7267a349be6ebb004FeCcff`)

    return {
        props: {
            tokens: tokens.data.assets,
            attributes: attributes.data
        }
    }
}