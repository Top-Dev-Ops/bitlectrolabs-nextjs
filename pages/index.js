import Head from 'next/head'

import Hero from '../components/hero'
import Subscribe from '../components/subscribe'
import Roadmap from '../components/roadmap'
import Brands from '../components/brands'
import Social from '../components/social'
import BuyNFTs from '../components/buyNFTs'

import LinkTo from '../components/custom/LinkTo'
import CardLayout from '../layouts/card-layout'
import { BsArrowRight } from 'react-icons/bs'

export default function Home() {
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

        {/* DREAMLOOPS */}
        <CardLayout variant="primary">
          <img
            src="/images/4.png"
            className="card-image mx-5 mx-sm-auto mt-5 mt-sm-0"
          />
          
          <div className="d-flex flex-column align-items-start justify-content-center mb-5 mb-sm-0 mx-5">
            <h2 className="text-white">Dreamloops</h2>
            <p className="w-100 w-lg-50 text-left">A generative series of audio-visual non-fungible tokens - some redeemable for vinyl or cassette.</p>
            <LinkTo
              href={'/'}
              text={'Explore'}
              icon={<BsArrowRight />}
            />
          </div>
        </CardLayout>
        
        {/* 20% OF NFTS */}
        <CardLayout variant="secondary">
          <div className="d-flex flex-column justify-content-center align-items-center mx-0 mt-5 mt-md-0 mx-md-5">
            <h3 className="text-white w-75">
              20% of NFTs may be redeemed for vinyl or cassette containing many songs from the collection
            </h3>
            <div className="w-75 d-inline-flex justify-content-left">
              <LinkTo
                href={'/'}
                text={'Learn more'}
                icon={<BsArrowRight />}
                extraClassNames="mb-4 my-md-4"
              />
            </div>
          </div>
          <div
            className="bg-white w-100 h-100 d-flex justify-content-center justify-content-sm-start align-items-center"
          >
            <img
              src="/images/5.png"
              className="w-100 h-auto"
            />
          </div>
        </CardLayout>
      
        {/* ROADMAP */}
        <Roadmap />

        {/* USE THE MUSIC */}
        <CardLayout variant="primary">
          <img
            src="/images/6.png"
            className="card-full-image w-md-100 h-md-100"
          />
          
          <div className="d-flex flex-column align-items-center justify-content-center mx-5 pb-3 pb-sm-0">
            <h3 className="text-white w-100 w-md-75">
              Use the music for your podcast, video game, Twitch stream, or YouTube video
            </h3>
            <div className="w-100 w-md-75">
              <p className="w-100 text-left">
                Dreamloops and the Dreamers NFTs come with a Creative Commons CC BY-ND license for each musical loop and a CC BY license for the visual composition.
              </p>
            </div>
            <div className="w-100 w-md-75 d-inline-flex flex-row justify-content-left">
              <LinkTo
                href={'/'}
                text={'More info'}
                icon={<BsArrowRight />}
                extraClassNames="my-0 my-lg-4"
              />
            </div>
          </div>
        </CardLayout>

        {/* DREAMLOOPS APPAREL */}
        <CardLayout variant="secondary">
          <img className="card-full-image h-md-100 w-md-100 d-block d-sm-none" src="/images/7.png" width="100%" />

          <div className="d-flex flex-column justify-content-center align-items-center mx-5 pb-5 pb-sm-0">
            <h3 className="text-white w-100 w-md-75">
              Dreamloops apparel is now available for purchase in our online store
            </h3>
            <div className="w-100 w-md-75 d-inline-flex justify-content-left">
              <LinkTo
                href={'/'}
                text={'Purchase'}
                icon={<BsArrowRight />}
                extraClassNames="mt-4"
              />
            </div>
          </div>

          <img className="card-full-image d-none d-sm-block h-md-100 w-md-100" src="/images/7.png" width="100%" />
        </CardLayout>

        <CardLayout variant="primary">
          <img
            src="/images/8.png"
            className="card-full-image w-md-100 h-md-100"
          />

          <div className="d-flex flex-column align-items-center justify-content-center mx-5 pb-3 pb-sm-0">
            <div className="w-100 w-md-75">
              <p className="w-100 text-left">
                Sandbox Integration
              </p>
            </div>
            <h3 className="text-white w-100 w-md-75">
              Dreamers NFT holders will be able to use their favorite Dreamers as avatars in The Sandbox with a voxelized version of their NFT
            </h3>
            <div className="w-100 w-md-75 d-inline-flex flex-row justify-content-left">
              <LinkTo
                href={'/'}
                text={'More info'}
                icon={<BsArrowRight />}
                extraClassNames="my-0 my-lg-4"
              />
            </div>
          </div>
        </CardLayout>
      
        {/* BRANDS */}
        <Brands />

        {/* HOW TO BUY NFTS */}
        <BuyNFTs />

        {/* SOCIALS, LOGO & TERMS OF USE */}
        <section className="row gx-0" style={{width: '96%', margin: '2vh 2% 2vh 2%'}}>
          <div className="col-12 col-lg-4 mb-2 mb-lg-0">
            <Social />
          </div>

          <div className="col-12 col-lg-4 mb-2 mb-lg-0 px-lg-3">
            <div className="social d-flex justify-content-center align-items-center">
              <p className="my-0" style={{fontSize: 'var(--subHeadingMd)', color: 'var(--midGray400)'}}>
                ©BitlectroLabs 2021
              </p>
            </div>
          </div>

          <div className="col-12 col-lg-4 mb-2 mb-lg-0">
            <div className="social d-flex justify-content-center align-items-center">
              <p className="my-0" style={{fontSize: 'var(--subHeadingMd)', color: 'var(--midGray400)'}}>
                Terms of Use
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
