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
            <Link href="">
                <Instagram />
            </Link>
            <Link href="">
                <Youtube />
            </Link>
            <Link href="">
                <Magnet />
            </Link>
            <Link href="">
                <Boat />
            </Link>
        </section>
    )
}

export default Social