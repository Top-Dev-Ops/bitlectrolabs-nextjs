import Head from 'next/head'

import Navbar from '../../components/navbar'

const PrimaryLayout = ({ children }) => (
  <>
    <Head>
      <title>BitlectroLabs</title>
    </Head>

    <div className="main">
      <Navbar />

      {children}
    </div>
  </>
)

export default PrimaryLayout
