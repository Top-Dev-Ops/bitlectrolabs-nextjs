import { useRouter } from 'next/router'
import Badge from '../custom/Badge'
import Button from '../custom/Button'
import VerticalCarousel from '../custom/VerticalCarousel'
import HorizontalCarousel from '../custom/HorizontalCarousel'

const Hero = ({ tokens }) => {
    const router = useRouter()

    return <section className='hero'>
        <div className="row gx-0 flex-column justify-content-between flex-sm-row">
            <div className="col-12 px-5 col-sm-4 px-sm-0 offset-sm-1 d-flex flex-column justify-content-center">
                <Badge text={'Recent Drop'} />
                <h1>Dreamers</h1>

                <p>The “Dreamers” Airdrop is happening soon for Dreamloops holders!<br /> Sale to follow.</p>

                <Button
                    text={'Discover'}
                    variant={'primary'}
                    onClick={() => router.push('/collections/Dreamers')}
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
    const router = useRouter()
    
    return <section className="collection-hero">
        {hero.banner.url !== null && hero.banner.url !== '' && (
            <img
                src={hero.banner.url}
                className="w-100 h-auto"
                style={{marginBottom: '74px'}}
            />
        )}

        <div className="row gx-0">
            <div className="col-12 text-center">
                <h2
                    className="text-center"
                    style={{
                        color: `${router.query.collection === 'Dreamers' ? 'var(--green900)' : 'undefined'}`,
                        backgroundClip: `${router.query.collection === 'Dreamers' ? 'inherit' : 'text'}`,
                        WebkitTextFillColor: `${router.query.collection === 'Dreamers' ? 'inherit' : 'transparent'}`,
                        background: `${router.query.collection === 'Dreamers' ? 'inherit' : undefined}`,
                    }}
                >
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