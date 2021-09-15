import { Boat, Discord, Instagram, Magnet, Twitter, Youtube } from '../custom/svgs'

const Social = ({ extraClassNames }) => {
    return (
        <section className={`social ${extraClassNames}`}>
            <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
                <Twitter />
            </a>
            <a href="https://www.discord.com" target="_blank" rel="noreferrer">
                <Discord />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
                <Instagram />
            </a>
            <a href="https://www.youtube.com" target="_blank" rel="noreferrer">
                <Youtube />
            </a>
            <a href="https://www.google.com" target="_blank" rel="noreferrer">
                <Magnet />
            </a>
            <a href="https://www.google.com" target="_blank" rel="noreferrer">
                <Boat />
            </a>
        </section>
    )
}

export default Social