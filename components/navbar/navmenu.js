import Link from 'next/link'

const NavMenu = ({ menus }) => {
    return <div className="nav-menu">
        {menus.map((menu, index) => (
            <div key={`menu_${menu}`} className="nav-menu-item">
                <Link href={`/${menu.toLowerCase()}`}>
                    <a>{menu}</a>
                </Link>
                {index !== menus.length - 1 && <span>▪</span>}
            </div>
        ))}
    </div>
}

export default NavMenu