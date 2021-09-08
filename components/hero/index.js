import Badge from "../custom/Badge"
import Button from "../custom/Button"

const Hero = () => {
    return <section className="hero">
        <Badge text={'Recent Drop'} />

        <h1>Dreamers</h1>

        <p>The “Dreamers” Airdrop is happening soon for Dreamloops holders!<br /> Sale to follow.</p>

        <Button
            text={'Discover'}
            variant={'secondary'}
        />
    </section>
}

export default Hero