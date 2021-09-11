import { Boat, Discord, Instagram, Magnet, Twitter, Youtube } from '../custom/svgs'

const Social = ({ extraClassNames }) => {
    return (
        <section className={`social ${extraClassNames}`}>
            <Twitter />
            <Discord />
            <Instagram />
            <Youtube />
            <Magnet />
            <Boat />
        </section>
    )
}

export default Social