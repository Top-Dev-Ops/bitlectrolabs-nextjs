import Link from 'next/link'
import { Boat, Discord, Instagram, Magnet, Twitter, Youtube } from '../custom/svgs'

const Social = ({ extraClassNames }) => {
    return (
        <section className={`social ${extraClassNames}`}>
            <Link href="www.twitter.com">
                <Twitter />
            </Link>
            <Link href="www.discord.com">
                <Discord />
            </Link>
            <Link href="www.instagram.com">
                <Instagram />
            </Link>
            <Link href="www.youtube.com">
                <Youtube />
            </Link>
            <Link href="www.google.com">
                <Magnet />
            </Link>
            <Link href="www.google.com">
                <Boat />
            </Link>
        </section>
    )
}

export default Social