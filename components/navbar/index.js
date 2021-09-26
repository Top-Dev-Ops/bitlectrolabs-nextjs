import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import NavMenu from './navmenu'
import Button, { TextButton } from '../custom/Button'
import Social from '../social'

import { Logo, Hamburger, Close } from '../custom/svgs'

const Navbar = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const [metaMaskInstalled, setMetaMaskInstalled] = useState(false)

    const onClick = () => setModalOpen(!modalOpen)

    const router = useRouter()

    useEffect(() => {
        if (window.ethereum !== undefined) {
            setMetaMaskInstalled(true)
        }
    }, [])

    return (
        <section className={`${modalOpen ? 'modal nav-bar' : undefined}`} style={{zIndex: '9'}}>
            <div className="top-nav-bar">
                <Link href="/">
                    <a onClick={() => setModalOpen(false)}>
                        <Logo />
                    </a>
                </Link>

                <NavMenu menus={['Collections', 'Gallery', 'News', 'About']} />

                <div className="mobile-button">
                    {metaMaskInstalled ? (
                        <TextButton
                            text="My Bitlectro"
                            variant="underlined"
                            onClick={() => router.push('/my-bitlectro')}
                        />
                    ) : (
                        <Button
                            text="Install MetaMask"
                            variant="outline"
                            onClick={() => window.open('https://metamask.io/download', '_blank')}
                        />
                    )}
                </div>

                {modalOpen ? <Close onClick={onClick} /> : <Hamburger onClick={onClick} />}
            </div>

            {modalOpen && <div className="p-3">
                <h2 style={{color: 'var(--midGray700)'}}>Sale</h2>
                <Link href="/collections">
                    <h2 onClick={onClick}>Collections</h2>
                </Link>
                <Link href="/gallery">
                    <h2 onClick={onClick}>Gallery</h2>
                </Link>
                <Link href="/news">
                    <h2 onClick={onClick}>News</h2>
                </Link>
                <Link href="/about">
                    <h2 onClick={onClick}>About</h2>
                </Link>

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