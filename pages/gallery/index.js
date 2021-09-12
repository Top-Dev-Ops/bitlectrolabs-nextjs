import GalleryFooter from '../../components/gallery-footer'
import GalleryImages from '../../components/gallery-images'

import styles from '../../styles/gallery.module.css'

export default function Gallery() {
    return (
        <section className={styles.gallery}>
            <h3 className="text-white text-center mb-5">Dreamloops</h3>

            <GalleryImages extraClassNames={'my-5'} />

            <p className="text-white text-center pt-0 pt-sm-5 pt-md-5 mt-5 pt-xl-0 mt-xl-0">#9361</p>

            <GalleryFooter />
        </section>
    )
}