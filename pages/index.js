import Head from 'next/head'

import Hero from '../components/hero'

export default function Home() {
  return (
    <div>
      <Head>
        <title>BitlectroLabs</title>
        <meta name="description" content="BitlectroLabs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Hero />
      </main>
    </div>
  )
}
