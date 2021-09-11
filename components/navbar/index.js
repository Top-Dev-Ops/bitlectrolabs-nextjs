import React, { useState } from 'react'
import Link from 'next/link'
import NavMenu from './navmenu'
import Button from '../custom/Button'
import Social from '../social'

import { Logo, Hamburger, Close } from '../custom/svgs'

const Navbar = () => {
    const [modalOpen, setModalOpen] = useState(false)

    const onClick = () => setModalOpen(!modalOpen)

    return (
        <section className={`${modalOpen ? 'modal nav-bar' : undefined}`}>
            <div className="top-nav-bar">
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

                {modalOpen ? <Close onClick={onClick} /> : <Hamburger onClick={onClick} />}
            </div>

            {modalOpen && <div className="p-3">
                <h2 style={{color: 'var(--midGray700)'}}>Sale</h2>
                <h2>Collections</h2>
                <h2>Gallery</h2>
                <h2>News</h2>
                <h2>About</h2>

                <p className="mt-5">Visit on desktop for better</p>
                <p className="text-white mb-5">NFT experience</p>

                <div className="row gx-0">
                    <div className="col-12 col-sm-6 mb-5">
                        <Social extraClassNames={'bg-transparent'} />
                    </div>
                    <div className="col-12 d-flex flex-row justify-content-between">
                        <p>©BitlectroLabs 2021</p>
                        <p>Terms of Use</p>
                    </div>
                </div>
            </div>}
        </section>
    )
}

export default Navbar