import Head from 'next/head'

import Hero from '../components/hero'
import Subscribe from '../components/subscribe'
import Roadmap from '../components/roadmap'
import Partners from '../components/partners'
import MarketingBanner from '../components/marketing-banner'
import Footer from '../components/footer'

import LinkTo from '../components/custom/LinkTo'
import ProgressBar from '../components/custom/ProgressBar'
import CardLayout from '../layouts/card-layout'
import { BsArrowRight } from 'react-icons/bs'

import Prismic from 'prismic-javascript'
import { Client } from '../prismic-configuration'

export default function Home({ marketingCards, roadmaps, partners, marketingBanners }) {

  return (
    <>
      <Head>
        <title>BitlectroLabs</title>
        <meta name="description" content="BitlectroLabs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-100">
        <Hero />

        <Subscribe />

        <CardLayout>
          <div className="mb-5 pb-5 card-grid justify-content-around">
            <img
              src="/images/4.png"
              className="card-image mx-5 mx-sm-auto mt-5 mt-sm-0"
            />
            
            <div className="d-flex flex-column align-items-start justify-content-center mt-4 mt-sm-0 mb-0 mx-5">
              <h2 className="text-white">Dreamloops</h2>
              <p className="w-100 w-lg-50 text-left">A generative series of audio-visual non-fungible tokens - some redeemable for vinyl or cassette.</p>
              <LinkTo
                href={'/'}
                text={'Explore'}
                icon={<BsArrowRight />}
              />
            </div>
          </div>

          <ProgressBar percentage={20} extraClassNames="mt-2 mb-5 mt-lg-5" />
        </CardLayout>
        
        {/* FIRST MARKETING CARD */}
        {marketingCards.length > 0 &&
          <CardLayout key={`marketing_card_${marketingCards[0].uid}`} variant={marketingCards[0].data.toggle ? 'secondary' : 'primary'}>
            <div className="d-flex flex-column justify-content-center align-items-center mx-5 my-4 mt-md-0">
              {marketingCards[0].data.subtitle.length > 0 && (
                <div className="w-100 w-md-75">
                  <p className="w-100 text-left">
                    {marketingCards[0].data.subtitle[0].text}
                  </p>
                </div>
              )}

              {marketingCards[0].data.title.length > 0 && (
                <h3 className="text-white w-100 w-md-75">
                  {marketingCards[0].data.title[0].text}
                </h3>
              )}
              
              {marketingCards[0].data.linktext.length > 0 && (
                <div className="w-100 w-md-75 d-inline-flex flex-row justify-content-left">
                  <LinkTo
                    href={marketingCards[0].data.link.url !== undefined ? marketingCards[0].data.link.url : '/'}
                    text={marketingCards[0].data.linktext[0].text}
                    icon={<BsArrowRight />}
                    extraClassNames="my-0 my-lg-4"
                  />
                </div>
              )}
            </div>
            <div
              className="bg-white w-100 h-100 d-flex justify-content-center justify-content-sm-start align-items-center"
            >
              <img
                src={`${marketingCards[0].data.image.url}`}
                className="w-100 h-auto"
              />
            </div>
          </CardLayout>
        }
        
        {/* ROADMAP */}
        <Roadmap roadmaps={roadmaps} />

        {/* MARKETING CARDS */}
        {marketingCards.length > 0 && marketingCards.map((marketingCard, index) => {
          return index === 0 ? undefined : (
            <CardLayout key={`marketing_card_${marketingCard.uid}`} variant={marketingCard.data.toggle ? 'secondary' : 'primary'}>
              <img
                src={`${marketingCard.data.image.url}`}
                className={`card-full-image w-md-100 h-md-100 ${marketingCard.data.toggle ? 'd-block d-sm-none' : undefined}`}
              />

              <div className="d-flex flex-column align-items-center justify-content-center mx-5 pb-3 pb-sm-0">
                {marketingCard.data.subtitle.length > 0 && (
                  <div className="w-100 w-md-75">
                    <p className="w-100 text-left">
                      {marketingCard.data.subtitle[0].text}
                    </p>
                  </div>
                )}

                {marketingCard.data.title.length > 0 && (
                  <h3 className="text-white w-100 w-md-75">
                    {marketingCard.data.title[0].text}
                  </h3>
                )}
                
                {marketingCard.data.linktext.length > 0 && (
                  <div className="w-100 w-md-75 d-inline-flex flex-row justify-content-left">
                    <LinkTo
                      href={marketingCard.data.link.url !== undefined ? marketingCard.data.link.url : '/'}
                      text={marketingCard.data.linktext[0].text}
                      icon={<BsArrowRight />}
                      extraClassNames="my-0 my-lg-4"
                    />
                  </div>
                )}
              </div>

              {marketingCard.data.toggle && (
                <img
                  src={`${marketingCard.data.image.url}`}
                  className="card-full-image d-none d-sm-block h-md-100 w-md-100"
                />
              )}
            </CardLayout>
          )
        })}

        {/* PARTNERS */}
        <Partners partners={partners} />

        {/* MARKETING BANNER - HOW TO BUY NFTS */}
        {marketingBanners.length > 0 && marketingBanners.map((marketingBanner => (
          <MarketingBanner
            key={`marketing_banner_${marketingBanner.uid}`}
            heading={marketingBanner.data.title[0].text}
            paragraph={marketingBanner.data.body_paragraph[0].text}
            linkText={marketingBanner.data.link_text[0].text}
            link={marketingBanner.data.link.url}
          />
        )))}

        {/* SOCIALS, LOGO & TERMS OF USE */}
        <Footer />
      </main>
    </>
  )
}

export async function getStaticProps() {
  const marketingCards = await Client().query(
    Prismic.Predicates.at('document.type', 'marketing_card')
  )

  const roadmaps = await Client().query(
    Prismic.Predicates.at('document.type', 'roadmap')
  )

  const partners = await Client().query(
    Prismic.Predicates.at('document.type', 'partners')
  )

  const marketingBanners = await Client().query(
    Prismic.Predicates.at('document.type', 'marketing_banner')
  )

  return {
    props: {
      marketingCards: marketingCards.results.sort((a, b) => new Date(a.first_publication_date) - new Date(b.first_publication_date)),
      roadmaps: roadmaps.results.sort((a, b) => new Date(a.data.date) - new Date(b.data.date)),
      partners: partners.results.sort((a, b) => new Date(a.first_publication_date) - new Date(b.first_publication_date)),
      marketingBanners: marketingBanners.results.sort((a, b) => new Date(a.first_publication_date) - new Date(b.first_publication_date)),
    }
  }
} 