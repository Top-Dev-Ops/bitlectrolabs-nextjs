import React, { useState, useEffect } from 'react'

export default function GalleryList({ extraClassNames, left, right, tokenSelect }) {
    const images = ['1.png', '2.png', '3.png', '4.png', '9.png', '10.png', '11.png']

    const [LgImages, setLgImages] = useState(images)
    const [MdImages, setMdImages] = useState(images.slice(1, 6))
    const [SmImages, setSmImages] = useState(images.slice(1, 4))
    const [start, setStart] = useState(0)
    const [hover, setHover] = useState('')

    const onMouseDown = e => {
        e.preventDefault()
        setStart(e.clientX)
    }

    const onMouseUp = e => {
        e.preventDefault()
        if (Math.abs(start - e.clientX) > 150 && start > e.clientX) {           // slide to right
            slideLeft()
        } else if (Math.abs(start - e.clientX) > 150 && start < e.clientX) {    // slide to left
            slideRight()
        }
    }

    useEffect(() => slideLeft, [left])
    useEffect(() => slideRight, [right])

    const slideLeft = () => {
        const [first, ...rest] = LgImages
        const temp = [...rest, first]
        setLgImages(temp)
        setMdImages(temp.slice(1, 6))
        setSmImages(temp.slice(1, 4))
    }

    const slideRight = () => {
        const last = LgImages.slice(-1)
        const rest = LgImages.slice(0, -1)
        const temp = [last, ...rest]
        setLgImages(temp)
        setMdImages(temp.slice(1, 6))
        setSmImages(temp.slice(1, 4))
    }

    return (
        <>
            <div
                className={`w-100 d-none d-lg-flex justify-content-between position-relative ${extraClassNames}`}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onTouchStart={onMouseDown}
                onTouchEnd={onMouseUp}
            >
                <div style={{position: 'relative', width: '5.5%', margin: '0 .25% 0 10px', height: '70%', borderRadius: '16px', border: '4px solid rgb(255 255 255 / 40%)', }}>
                    <img
                        src={`/images/${LgImages[0]}`}
                        className="galleryImage"
                        onMouseEnter={() => setHover('Lg0')}
                        onMouseLeave={() => setHover('')}
                        style={{opacity: '.4'}}
                        onClick={tokenSelect}
                    />
                    {hover === 'Lg0' && <div className="marquee" onMouseEnter={() => setHover('Lg0')}>
                        <div>
                            <span>#3298</span>
                            <span>#3298</span>
                            <span>#3298</span>
                        </div>
                    </div>}
                </div>
                <div style={{position: 'relative', width: '11.5%', margin: '0 .25%', height: '80%', borderRadius: '16px', border: '4px solid rgb(255 255 255 / 60%)'}}>
                    <img
                        src={`/images/${LgImages[1]}`}
                        className="galleryImage"
                        onMouseEnter={() => setHover('Lg1')}
                        onMouseLeave={() => setHover('')}
                        style={{opacity: '.6'}}
                        onClick={tokenSelect}
                    />
                    {hover === 'Lg1' && <div className="marquee" onMouseEnter={() => setHover('Lg1')}>
                        <div>
                            <span>#3298</span>
                            <span>#3298</span>
                            <span>#3298</span>
                        </div>
                    </div>}
                </div>
                <div style={{position: 'relative', width: '17.5%', margin: '0 .25%', height: '90%', borderRadius: '16px', border: '4px solid rgb(255 255 255 / 80%)'}}>
                    <img
                        src={`/images/${LgImages[2]}`}
                        className="galleryImage"
                        onMouseEnter={() => setHover('Lg2')}
                        onMouseLeave={() => setHover('')}
                        style={{opacity: '.8'}}
                        onClick={tokenSelect}
                    />
                    {hover === 'Lg2' && <div className="marquee" onMouseEnter={() => setHover('Lg2')}>
                        <div>
                            <span>#3298</span>
                            <span>#3298</span>
                            <span>#3298</span>
                        </div>
                    </div>}
                </div>
                <div style={{position: 'relative', width: '27.5%', margin: '0 .25%', height: '100%', borderRadius: '16px', border: '4px solid var(--pureWhite)'}}>
                    <img
                        src={`/images/${LgImages[3]}`}
                        className="galleryImage"
                        onMouseEnter={() => setHover('Lg3')}
                        onMouseLeave={() => setHover('')}
                        onClick={tokenSelect}
                    />
                    {hover === 'Lg3' && <div className="marquee" onMouseEnter={() => setHover('Lg3')}>
                        <div>
                            <span>#3298</span>
                            <span>#3298</span>
                            <span>#3298</span>
                        </div>
                    </div>}
                </div>
                <div style={{position: 'relative', width: '17.5%', margin: '0 .25%', height: '90%', borderRadius: '16px', border: '4px solid rgb(255 255 255 / 80%)'}}>
                    <img
                        src={`/images/${LgImages[4]}`}
                        className="galleryImage"
                        onMouseEnter={() => setHover('Lg4')}
                        onMouseLeave={() => setHover('')}
                        style={{opacity: '.8'}}
                        onClick={tokenSelect}
                    />
                    {hover === 'Lg4' && <div className="marquee" onMouseEnter={() => setHover('Lg4')}>
                        <div>
                            <span>#3298</span>
                            <span>#3298</span>
                            <span>#3298</span>
                        </div>
                    </div>}
                </div>
                <div style={{position: 'relative', width: '11.5%', margin: '0 .25%', height: '80%', borderRadius: '16px', border: '4px solid rgb(255 255 255 / 60%)'}}>
                    <img
                        src={`/images/${LgImages[5]}`}
                        className="galleryImage"
                        onMouseEnter={() => setHover('Lg5')}
                        onMouseLeave={() => setHover('')}
                        style={{opacity: '.6'}}
                        onClick={tokenSelect}
                    />
                    {hover === 'Lg5' && <div className="marquee" onMouseEnter={() => setHover('Lg5')}>
                        <div>
                            <span>#3298</span>
                            <span>#3298</span>
                            <span>#3298</span>
                        </div>
                    </div>}
                </div>
                <div style={{position: 'relative', width: '5.5%', margin: '0 10px 0 .25%', height: '70%', borderRadius: '16px', border: '4px solid rgb(255 255 255 / 40%)'}}>
                    <img
                        src={`/images/${LgImages[6]}`}
                        className="galleryImage"
                        onMouseEnter={() => setHover('Lg6')}
                        onMouseLeave={() => setHover('')}
                        style={{opacity: '.4'}}
                        onClick={tokenSelect}
                    />
                    {hover === 'Lg6' && <div className="marquee" onMouseEnter={() => setHover('Lg6')}>
                        <div>
                            <span>#3298</span>
                            <span>#3298</span>
                            <span>#3298</span>
                        </div>
                    </div>}
                </div>
            </div>
            
            <div
                className={`w-100 d-none d-md-flex d-lg-none justify-content-between position-relative ${extraClassNames}`}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onTouchStart={onMouseDown}
                onTouchEnd={onMouseUp}
            >
                <div style={{position: 'relative', width: '9.5%', margin: '0 .25%', height: '110%', borderRadius: '16px', border: '4px solid rgb(255 255 255 / 40%)', borderTopLeftRadius: '0', borderBottomLeftRadius: '0', borderLeft: '0'}}>
                    <img
                        src={`/images/${MdImages[0]}`}
                        className="galleryImage"
                        style={{borderTopLeftRadius: '0', borderBottomLeftRadius: '0', opacity: '.4'}}
                        onClick={tokenSelect}
                        onMouseEnter={() => setHover('Md0')}
                        onMouseLeave={() => setHover('')}
                    />
                    {hover === 'Md0' && <div className="marquee" onMouseEnter={() => setHover('Md0')}>
                        <div>
                            <span>#3298</span>
                            <span>#3298</span>
                            <span>#3298</span>
                        </div>
                    </div>}
                </div>
                <div style={{position: 'relative', width: '24.5%', margin: '0 .25%', height: '120%', borderRadius: '16px', border: '4px solid rgb(255 255 255 / 60%)'}}>
                    <img
                        src={`/images/${MdImages[1]}`}
                        className="galleryImage"
                        style={{opacity: '.6'}}
                        onClick={tokenSelect}
                        onMouseEnter={() => setHover('Md1')}
                        onMouseLeave={() => setHover('')}
                    />
                    {hover === 'Md1' && <div className="marquee" onMouseEnter={() => setHover('Md1')}>
                        <div>
                            <span>#3298</span>
                            <span>#3298</span>
                            <span>#3298</span>
                        </div>
                    </div>}
                </div>
                <div style={{position: 'relative', width: '29.5%', margin: '0 .25%', height: '130%', borderRadius: '16px', border: '4px solid var(--pureWhite)'}}>
                    <img
                        src={`/images/${MdImages[2]}`}
                        className="galleryImage"
                        onClick={tokenSelect}
                        onMouseEnter={() => setHover('Md2')}
                        onMouseLeave={() => setHover('')}
                    />
                    {hover === 'Md2' && <div className="marquee" onMouseEnter={() => setHover('Md2')}>
                        <div>
                            <span>#3298</span>
                            <span>#3298</span>
                            <span>#3298</span>
                        </div>
                    </div>}
                </div>
                <div style={{position: 'relative', width: '24.5%', margin: '0 .25%', height: '120%', borderRadius: '16px', border: '4px solid rgb(255 255 255 / 60%)'}}>
                    <img
                        src={`/images/${MdImages[3]}`}
                        className="galleryImage"
                        style={{opacity: '.6'}}
                        onClick={tokenSelect}
                        onMouseEnter={() => setHover('Md3')}
                        onMouseLeave={() => setHover('')}
                    />
                    {hover === 'Md3' && <div className="marquee" onMouseEnter={() => setHover('Md3')}>
                        <div>
                            <span>#3298</span>
                            <span>#3298</span>
                            <span>#3298</span>
                        </div>
                    </div>}
                </div>
                <div style={{position: 'relative', width: '9.5%', margin: '0 .25%', height: '110%', borderRadius: '16px', border: '4px solid rgb(255 255 255 / 40%)', borderTopRightRadius: '0', borderBottomRightRadius: '0', borderRight: '0'}}>
                    <img
                        src={`/images/${MdImages[4]}`}
                        className="galleryImage"
                        style={{borderTopRightRadius: '0', borderBottomRightRadius: '0', opacity: '.4'}}
                        onClick={tokenSelect}
                        onMouseEnter={() => setHover('Md4')}
                        onMouseLeave={() => setHover('')}
                    />
                    {hover === 'Md4' && <div className="marquee" onMouseEnter={() => setHover('Md4')}>
                        <div>
                            <span>#3298</span>
                            <span>#3298</span>
                            <span>#3298</span>
                        </div>
                    </div>}
                </div>
            </div>

            <div
                className={`w-100 d-none d-sm-flex d-md-none justify-content-between position-relative ${extraClassNames}`}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onTouchStart={onMouseDown}
                onTouchEnd={onMouseUp}
            >
                <div style={{position: 'relative', width: '28%', margin: '0 1%', height: '140%', borderRadius: '16px', border: '4px solid rgb(255 255 255 / 60%)', borderTopLeftRadius: '0', borderBottomLeftRadius: '0', borderLeft: '0'}}>
                    <img
                        src={`/images/${SmImages[0]}`}
                        className="galleryImage"
                        style={{borderTopLeftRadius: '0', borderBottomLeftRadius: '0', opacity: '.6'}}
                        onClick={tokenSelect}
                        onMouseEnter={() => setHover('Sm0')}
                        onMouseLeave={() => setHover('')}
                    />
                    {hover === 'Sm0' && <div className="marquee" onMouseEnter={() => setHover('Sm0')}>
                        <div>
                            <span>#3298</span>
                            <span>#3298</span>
                            <span>#3298</span>
                        </div>
                    </div>}
                </div>
                <div style={{position: 'relative', width: '38%', margin: '0 1%', height: '150%', borderRadius: '16px', border: '4px solid var(--pureWhite)'}}>
                    <img
                        src={`/images/${SmImages[1]}`}
                        className="galleryImage"
                        onClick={tokenSelect}
                        onMouseEnter={() => setHover('Sm1')}
                        onMouseLeave={() => setHover('')}
                    />
                    {hover === 'Sm1' && <div className="marquee" onMouseEnter={() => setHover('Sm1')}>
                        <div>
                            <span>#3298</span>
                            <span>#3298</span>
                            <span>#3298</span>
                        </div>
                    </div>}
                </div>
                <div style={{position: 'relative', width: '28%', margin: '0 1%', height: '140%', borderRadius: '16px', border: '4px solid rgb(255 255 255 / 60%)', borderTopRightRadius: '0', borderBottomRightRadius: '0', borderRight: '0'}}>
                    <img
                        src={`/images/${SmImages[2]}`}
                        className="galleryImage"
                        style={{borderTopRightRadius: '0', borderBottomRightRadius: '0', opacity: '.6'}}
                        onClick={tokenSelect}
                        onMouseEnter={() => setHover('Sm2')}
                        onMouseLeave={() => setHover('')}
                    />
                    {hover === 'Sm2' && <div className="marquee" onMouseEnter={() => setHover('Sm2')}>
                        <div>
                            <span>#3298</span>
                            <span>#3298</span>
                            <span>#3298</span>
                        </div>
                    </div>}
                </div>
            </div>

            <div
                className={`w-100 d-flex d-sm-none justify-content-between position-relative ${extraClassNames}`}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onTouchStart={onMouseDown}
                onTouchEnd={onMouseUp}
            >
                <div style={{position: 'relative', width: '13%', margin: '0 1%', height: '100%', borderRadius: '16px', border: '4px solid rgb(255 255 255 / 60%)', borderTopLeftRadius: '0', borderBottomLeftRadius: '0', borderLeft: '0'}}>
                    <img
                        src={`/images/${SmImages[0]}`}
                        className="galleryImage"
                        style={{borderTopLeftRadius: '0', borderBottomLeftRadius: '0', opacity: '.6'}}
                        onClick={tokenSelect}
                        onMouseEnter={() => setHover('Xs0')}
                        onMouseLeave={() => setHover('')}
                    />
                    {hover === 'Xs0' && <div className="marquee" onMouseEnter={() => setHover('Xs0')}>
                        <div>
                            <span>#3298</span>
                            <span>#3298</span>
                            <span>#3298</span>
                        </div>
                    </div>}
                </div>
                <div style={{position: 'relative', width: '68%', margin: '0 1%', height: '110%', borderRadius: '16px', border: '4px solid var(--pureWhite)'}}>
                    <img
                        src={`/images/${SmImages[1]}`}
                        className="galleryImage"
                        onClick={tokenSelect}
                        onMouseEnter={() => setHover('Xs1')}
                        onMouseLeave={() => setHover('')}
                    />
                    {hover === 'Xs1' && <div className="marquee" onMouseEnter={() => setHover('Xs1')}>
                        <div>
                            <span>#3298</span>
                            <span>#3298</span>
                            <span>#3298</span>
                        </div>
                    </div>}
                </div>
                <div style={{position: 'relative', width: '13%', margin: '0 1%', height: '100%', borderRadius: '16px', border: '4px solid rgb(255 255 255 / 60%)', borderTopRightRadius: '0', borderBottomRightRadius: '0', borderRight: '0'}}>
                    <img
                        src={`/images/${SmImages[2]}`}
                        className="galleryImage"
                        style={{borderTopRightRadius: '0', borderBottomRightRadius: '0', opacity: '.6'}}
                        onClick={tokenSelect}
                        onMouseEnter={() => setHover('Xs2')}
                        onMouseLeave={() => setHover('')}
                    />
                    {hover === 'Xs2' && <div className="marquee" onMouseEnter={() => setHover('Xs2')}>
                        <div>
                            <span>#3298</span>
                            <span>#3298</span>
                            <span>#3298</span>
                        </div>
                    </div>}
                </div>
            </div>

            <style jsx>{`
                .marquee {
                    overflow: hidden;
                    position: absolute;
                    display: block;
                    top: 50%;
                    left: 0;
                }
                .marquee:hover {
                    cursor: url('/pointer1.svg') 0 0, pointer;
                }
                .marquee > div {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    margin: 0;
                    text-align: center;
                    -moz-animation: scroll-left 2s linear infinite;
                    -webkit-animation: scroll-left 2s linear infinite;
                    animation: scroll-left 10s linear infinite;
                }
                .marquee > div > span {
                    font-size: var(--subHeadingMd);
                    font-family: Platform;
                    color: var(--midGray900);
                }
                @-moz-keyframes scroll-left {
                    0% {
                        -moz-transform: translateX(100%);
                    }
                    100% {
                        -moz-transform: translateX(-100%);
                    }
                }
                
                @-webkit-keyframes scroll-left {
                    0% {
                        -webkit-transform: translateX(100%);
                    }
                    100% {
                        -webkit-transform: translateX(-100%);
                    }
                }
                
                @keyframes scroll-left {
                    0% {
                        -moz-transform: translateX(100%);
                        -webkit-transform: translateX(100%);
                        transform: translateX(100%);
                    }
                    100% {
                        -moz-transform: translateX(-100%);
                        -webkit-transform: translateX(-100%);
                        transform: translateX(-100%);
                    }
                }
            `}</style>
        </>
    )
}