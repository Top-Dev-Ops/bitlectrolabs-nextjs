import { useState, useEffect, useRef } from 'react'

import Head from 'next/head'

import GalleryFooter from '../../components/gallery-footer'
import ThreeApp from '../../components/gallery-grid'
import GalleryList from '../../components/gallery-list'
import { axiosDreamloops, axiosOpenSea } from '../../services/axios'

import styles from '../../styles/gallery.module.css'
import stylesBitlectro from '../../styles/my-bitlectro.module.css'
import GalleryCollection from '../../components/gallery-collection'
import GalleryCard from '../../components/gallery-card'

export default function Gallery({ tokens, attributes }) {
    const [app, setApp] = useState(null)
    const [view, setView] = useState(true)
    const [lastView, setLastView] = useState(false)
    const [left, setLeft] = useState(false)
    const [right, setRight] = useState(false)
    const [up, setUp] = useState('')
    const [down, setDown] = useState('')
    const [tokenSelected, setTokenSelected] = useState(null)
    const [filters, setFilters] = useState([])
    const [filteredTokens, setFilteredTokens] = useState(tokens)
    
    const containerRef = useRef(null)

    // FILTER TOKENS BY SELECTED ATTRIBUTES
    useEffect(() => {
        if (filters.length === 0) {
            setFilteredTokens(tokens)
        } else {
            setFilteredTokens(tokens.filter(token => {
                for (let i = 0; i < token.traits.length; i += 1) {
                    if (filters.includes(token.traits[i].value)) {
                        return true
                    }
                }
                return false
            }))
        }
    }, [filters])

    // CHANGE FILTERED TOKENS FOR 3D(GRID) VIEW OF GALLERY
    useEffect(() => {
        if (!app) return
        app.group.reBuild(filteredTokens)

    }, [filteredTokens])

    // START 3D(GRID) VIEW OF GALLERY
    useEffect(() => {
        if (app) return
        if (!containerRef.current) return
        const _app = new ThreeApp(containerRef.current)
        const threeAppStart = async () => {
            _app.setData(tokens);
            _app.start(() => { setLastView(view); setView(false) }, setTokenSelected)
            _app.resize()
            setApp(_app)
        }
        threeAppStart()
    }, [])

    // TOGGLE 3D(GRID) OR LIST VIEW
    useEffect(() => {
        if (!app) return
        if (view) {
            app.renderer.domElement.style.visibility = 'visible'
        } else {
            app.renderer.domElement.style.visibility = 'hidden'
        }
    }, [view])

    // SCROLL UP 3D(GRID) VIEW
    useEffect(() => {
        if(!app) return;
        app.keyController.mouseUp();
        setDown('')
    }, [up])

    // SCROLL DOWN 3D(GRID) VIEW
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

            {tokenSelected ? (
                <section className={stylesBitlectro.myBitlectro}>
                    <GalleryCollection
                        extraClassNames="mb-5 mb-lg-0"
                        onClose={() => {
                            setView(lastView)
                            setTokenSelected(null)
                        }}
                        token={tokenSelected}
                    />
                    <GalleryCard token={tokenSelected} />
                </section>
            ) : (
                <section className={`${styles.gallery} ${view ? 'justify-content-between' : undefined}`} ref={containerRef}>
                    <div className="text-center">
                        <h3
                            className="text-white text-center position-relative mb-5"
                            style={{zIndex: '3'}}
                        >
                            Dreamloops
                        </h3>

                        {filteredTokens.length === 0 && <>
                            <h4 className={styles.galleryNotFound}>We could not find anything</h4>
                            <p
                                className={styles.galleryResetFilter}
                                onClick={() => setFilters([])}
                            >Reset filter</p>
                        </>}
                    </div>

                    {view ? (
                        <div className={styles.galleryTopGradientBackground} />
                    ) : (
                        <GalleryList
                            left={left}
                            right={right}
                            tokens={filteredTokens}
                            tokenSelect={setTokenSelected}
                            setLastView={() => setLastView(view)}
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
                        filters={filters}
                        applyFilter={setFilters}
                    />
                </section>
            )}
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