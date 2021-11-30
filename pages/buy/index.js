import { axiosOpenSea } from '../../services/axios'
import GalleryCollection from '../../components/gallery-collection'
import GalleryCard from '../../components/gallery-card'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from '../../styles/sale.module.css'

//PUBLIC
import { CHECK_PUBLIC_SWITCH, PUBLIC_SALE_MINT, REMAINING_PUBLIC_SUPPLY, CALCULATE_PRICE, CALCULATE_PRICE_MULTIPLE } from '../../services/dreamers';
import Divider from '../../components/custom/Divider';

export default function Sale({ tokens }) {

    return (
        <section className={`${styles.sale} d-flex flex-column h-auto`}>
            <div className="d-flex flex-row justify-content-between mt-3 mb-5">
                <GalleryCollection
                    extraClassNames="d-none d-md-flex mb-5 mb-lg-0"
                    //token={tokens[0]}
                    whitelist
                />

                <GalleryCard
                    //token={tokens[0]}
                    whitelist
                />
            </div>

            <Divider/>

            <div className="d-flex flex-row justify-content-between mt-5 mb-3">
                <GalleryCollection
                    extraClassNames="d-none d-md-flex mb-5 mb-lg-0"
                    //token={tokens[0]}
                    dreamloop
                />

                <GalleryCard
                    //token={tokens[0]}
                    dreamloop
                />
            </div>
            
            <ToastContainer
                position='bottom-left'
                theme="dark"
            />
            <h1>No search result</h1>
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