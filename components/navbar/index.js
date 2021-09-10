import Link from 'next/link'
import NavMenu from './navmenu'
import Button from '../custom/Button'

import { Logo, Hamburger } from '../custom/svgs'

const Navbar = () => {
    return <section className="top-nav-bar">
        <Link href="/">
            <a>
                <Logo />
            </a>
        </Link>

        <NavMenu menus={['Collections', 'Gallery', 'News', 'About']} />

        <div className="mobile-button">
            <Button
                text="Install MetaMask"
                variant="outline"
            />
        </div>

        <Hamburger />
    </section>
}

export default Navbar