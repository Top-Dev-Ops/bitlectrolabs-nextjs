import { Boat, Discord, Instagram, Magnet, Twitter, Youtube } from '../custom/svgs'

const Social = ({ extraClassNames }) => {
    return (
        <section className={`social ${extraClassNames}`}>
            <a href="https://www.twitter.com/bitlectro" target="_blank" rel="noreferrer">
                <Twitter />
            </a>
            <a href="https://www.discord.gg/bitlectro" target="_blank" rel="noreferrer">
                <Discord />
            </a>
            <a href="https://www.instagram.com/bitlectro" target="_blank" rel="noreferrer">
                <Instagram />
            </a>
            <a href="https://www.youtube.com/channel/UCysKupQ05n-jZ5L14I8EEkA" target="_blank" rel="noreferrer">
                <Youtube />
            </a>
            <a href="http://bitlectro.party/" target="_blank" rel="noreferrer">
                <Magnet />
            </a>
            <a href="https://opensea.io/collection/thedreamers" target="_blank" rel="noreferrer">
                <Boat />
            </a>
        </section>
    )
}

export default Social