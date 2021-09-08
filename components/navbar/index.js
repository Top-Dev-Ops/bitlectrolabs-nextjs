import Link from 'next/link'
import NavMenu from './navmenu'
import Button from '../custom/Button'

const Navbar = () => {
    const menus = ['Collections', 'Gallery', 'News', 'About']

    return <div className="top-nav-bar">
        <Link href="/">
            <a>BitlectroLabs®</a>
        </Link>

        <NavMenu menus={menus} />

        <Button
            text="Install MetaMask"
            variant="primary"
        />
    </div>
}

export default Navbar