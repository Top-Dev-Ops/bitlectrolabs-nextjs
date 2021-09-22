import { useState, useEffect, useRef } from 'react'
import GalleryFooter from '../../components/gallery-footer'
import ThreeApp from '../../components/gallery-grid'
import GalleryList from '../../components/gallery-list'

import styles from '../../styles/gallery.module.css'

export default function Gallery() {
    const [app, setApp] = useState(null)
    const [view, setView] = useState(false)
    const [left, setLeft] = useState(false)
    const [right, setRight] = useState(false)
    const [up, setUp] = useState(false)
    const [down, setDown] = useState(false)

    const containerRef = useRef(null)

    useEffect(() => {
        if (app) return
        if (!containerRef.current) return
        const _app = new ThreeApp(containerRef.current)
        _app.start()
        _app.resize()
        _app.renderer.domElement.style.display = 'none'
        setApp(_app)
    }, [])

    useEffect(() => {
        if (!app) return
        if (view) {
            app.renderer.domElement.style.display = 'block'
        } else {
            app.renderer.domElement.style.display = 'none'
        }
    }, [view])

    return (
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

            {!view && (
                <GalleryList
                    extraClassNames={'my-5'}
                    left={left}
                    right={right}
                />
            )}

            <p
                className="text-white text-center pt-0 pt-sm-5 pt-md-5 mt-5 pt-xl-0 mt-xl-0"
                style={{zIndex: `${view ? '3' : undefined}`}}
            >
                #9361
            </p>

            <GalleryFooter
                view={view}
                changeView={() => setView(!view)}
                onClickLeft={() => setLeft(!left)}
                onClickRight={() => setRight(!right)}
                onClickUp={() => setUp(!up)}
                onClickDown={() => setDown(!down)}
            />
        </section>
    )
}