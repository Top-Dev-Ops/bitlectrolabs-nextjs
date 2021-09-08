import Layout from '../layouts'

import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css'
import '../styles/layouts/primary.css'
import '../styles/navbar/navbar.css'
import '../styles/hero/hero.css'
import '../styles/custom/custom.css'

function MyApp({ Component, pageProps }) {
  return <Layout>
    <Component {...pageProps} />
  </Layout>
}

export default MyApp
