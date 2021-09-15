import { Boat, Discord, Instagram, Magnet, Twitter, Youtube } from '../custom/svgs'

const Social = ({ extraClassNames }) => {
    return (
        <section className={`social ${extraClassNames}`}>
            <a href="https://www.twitter.com" target="_blank">
                <Twitter />
            </a>
            <a href="https://www.discord.com" target="_blank">
                <Discord />
            </a>
            <a href="https://www.instagram.com" target="_blank">
                <Instagram />
            </a>
            <a href="https://www.youtube.com" target="_blank">
                <Youtube />
            </a>
            <a href="https://www.google.com" target="_blank">
                <Magnet />
            </a>
            <a href="https://www.google.com" target="_blank">
                <Boat />
            </a>
        </section>
    )
}

export default Social