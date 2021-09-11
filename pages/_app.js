import Layout from '../layouts'

import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css'
import '../styles/layouts/primary.css'
import '../styles/layouts/card-layout.css'
import '../styles/navbar/navbar.css'
import '../styles/hero/hero.css'
import '../styles/custom/custom.css'
import '../styles/subscribe/subscribe.css'
import '../styles/roadmap/roadmap.css'
import '../styles/brands/brands.css'
import '../styles/social/social.css'
import '../styles/buyNFTs/buyNFTs.css'
import '../styles/collection-images/collection-images.css'

function MyApp({ Component, pageProps }) {
  return <Layout>
    <Component {...pageProps} />
  </Layout>
}

export default MyApp
