import Badge from '../custom/Badge'
import Button from '../custom/Button'
import VerticalCarousel from '../custom/VerticalCarousel'
import HorizontalCarousel from '../custom/HorizontalCarousel'

const Hero = ({ tokens }) => {
    return <section className='hero'>
        <div className="row gx-0 flex-column justify-content-between flex-sm-row">
            <div className="col-12 px-5 col-sm-4 px-sm-0 offset-sm-1 d-flex flex-column justify-content-center">
                <Badge text={'Recent Drop'} />
                <h1>Dreamers</h1>

                <p>The “Dreamers” Airdrop is happening soon for Dreamloops holders!<br /> Sale to follow.</p>

                <Button
                    text={'Discover'}
                    variant={'primary'}
                />
            </div>

            <div className="d-none d-sm-block">
                <VerticalCarousel tokens={tokens} />
            </div>

            <div className="d-block d-sm-none pt-4 overflow-hidden">
                <HorizontalCarousel />
            </div>
        </div>
    </section>
}

export const CollectionHero = ({ hero }) => {
    return <section className="collection-hero">
        <img
            src="/images/dreamloops.png"
            className="w-100 h-auto mb-5"
        />

        <div className="row gx-0">
            <div className="col-12 text-center">
                <h2 className="text-center">
                    {hero.title[0].text}
                </h2>

                <p className="my-5 text-center">
                    {hero.body_paragraph[0].text}
                </p>

                <span className="text-center">
                    {hero.support_text[0].text}
                </span>
            </div>
        </div>
    </section>
}

export default Hero