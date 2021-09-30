import { axiosOpenSea } from '../../services/axios'
import GalleryCollection from '../../components/gallery-collection'
import GalleryCard from '../../components/gallery-card'

import styles from '../../styles/sale.module.css'

export default function Sale({ tokens }) {

    return (
        <section className={styles.sale}>
            <GalleryCollection
                extraClassNames="mb-5 mb-lg-0"
                token={tokens[0]}
            />

            <GalleryCard
                token={tokens[0]}
            />
        </section>
    )
}

export async function getStaticProps() {
    const tokens = await axiosOpenSea.get('/assets?owner=0xdCD0739CA8935f13f1253a6c5C95D406560e5f6E&asset_contract_address=0xf1B33aC32dbC6617f7267a349be6ebb004FeCcff')

    return {
        props: {
            tokens: tokens.data.assets
        }
    }
}