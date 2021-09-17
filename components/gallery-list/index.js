import React, { useState, useEffect } from 'react'

export default function GalleryList({ extraClassNames, left, right }) {
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
                <div style={{width: '5.5%', margin: '0 .25%', height: '70%', position: 'relative', borderRadius: '16px', border: '4px solid var(--pureWhite)', opacity: '.4'}}>
                    <img
                        src={`/images/${LgImages[0]}`}
                        className="galleryImage"
                        onMouseEnter={() => setHover('Lg0')}
                        onMouseLeave={() => setHover('')}
                    />
                    {hover === 'Lg0' && <div>
                        <span>#3298</span>
                        <span>#3298</span>
                        <span>#3298</span>
                    </div>}
                </div>
                <div style={{width: '11.5%', margin: '0 .25%', height: '80%', position: 'relative', borderRadius: '16px', border: '4px solid var(--pureWhite)', opacity: '.6'}}>
                    <img
                        src={`/images/${LgImages[1]}`}
                        className="galleryImage"
                        onMouseEnter={() => setHover('Lg1')}
                        onMouseLeave={() => setHover('')}
                    />
                    {hover === 'Lg1' && <div>
                        <span>#3298</span>
                        <span>#3298</span>
                        <span>#3298</span>
                    </div>}
                </div>
                <div style={{width: '17.5%', margin: '0 .25%', height: '90%', position: 'relative', borderRadius: '16px', border: '4px solid var(--pureWhite)', opacity: '.8'}}>
                    <img
                        src={`/images/${LgImages[2]}`}
                        className="galleryImage"
                        onMouseEnter={() => setHover('Lg2')}
                        onMouseLeave={() => setHover('')}
                    />
                    {hover === 'Lg2' && <div>
                        <span>#3298</span>
                        <span>#3298</span>
                        <span>#3298</span>
                    </div>}
                </div>
                <div style={{width: '27.5%', margin: '0 .25%', height: '100%', position: 'relative', borderRadius: '16px', border: '4px solid var(--pureWhite)'}}>
                    <img
                        src={`/images/${LgImages[3]}`}
                        className="galleryImage"
                        onMouseEnter={() => setHover('Lg3')}
                        onMouseLeave={() => setHover('')}
                    />
                    {hover === 'Lg3' && <div>
                        <span>#3298</span>
                        <span>#3298</span>
                        <span>#3298</span>
                    </div>}
                </div>
                <div style={{width: '17.5%', margin: '0 .25%', height: '90%', position: 'relative', borderRadius: '16px', border: '4px solid var(--pureWhite)', opacity: '.8'}}>
                    <img
                        src={`/images/${LgImages[4]}`}
                        className="galleryImage"
                        onMouseEnter={() => setHover('Lg4')}
                        onMouseLeave={() => setHover('')}
                    />
                    {hover === 'Lg4' && <div>
                        <span>#3298</span>
                        <span>#3298</span>
                        <span>#3298</span>
                    </div>}
                </div>
                <div style={{width: '11.5%', margin: '0 .25%', height: '80%', position: 'relative', borderRadius: '16px', border: '4px solid var(--pureWhite)', opacity: '.6'}}>
                    <img
                        src={`/images/${LgImages[5]}`}
                        className="galleryImage"
                        onMouseEnter={() => setHover('Lg5')}
                        onMouseLeave={() => setHover('')}
                    />
                    {hover === 'Lg5' && <div>
                        <span>#3298</span>
                        <span>#3298</span>
                        <span>#3298</span>
                    </div>}
                </div>
                <div style={{width: '5.5%', margin: '0 .25%', height: '70%', position: 'relative', borderRadius: '16px', border: '4px solid var(--pureWhite)', opacity: '.4'}}>
                    <img
                        src={`/images/${LgImages[6]}`}
                        className="galleryImage"
                        onMouseEnter={() => setHover('Lg6')}
                        onMouseLeave={() => setHover('')}
                    />
                    {hover === 'Lg6' && <div>
                        <span>#3298</span>
                        <span>#3298</span>
                        <span>#3298</span>
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
                <div style={{width: '9.5%', margin: '0 .25%', height: '110%', borderRadius: '16px', border: '4px solid var(--pureWhite)', borderTopLeftRadius: '0', borderBottomLeftRadius: '0', borderLeft: '0', opacity: '.4'}}>
                    <img src={`/images/${MdImages[0]}`} className="galleryImage" style={{borderTopLeftRadius: '0', borderBottomLeftRadius: '0'}} />
                </div>
                <div style={{width: '24.5%', margin: '0 .25%', height: '120%', borderRadius: '16px', border: '4px solid var(--pureWhite)', opacity: '.6'}}>
                    <img src={`/images/${MdImages[1]}`} className="galleryImage" />
                </div>
                <div style={{width: '29.5%', margin: '0 .25%', height: '130%', borderRadius: '16px', border: '4px solid var(--pureWhite)'}}>
                    <img src={`/images/${MdImages[2]}`} className="galleryImage" />
                </div>
                <div style={{width: '24.5%', margin: '0 .25%', height: '120%', borderRadius: '16px', border: '4px solid var(--pureWhite)', opacity: '.6'}}>
                    <img src={`/images/${MdImages[3]}`} className="galleryImage" />
                </div>
                <div style={{width: '9.5%', margin: '0 .25%', height: '110%', borderRadius: '16px', border: '4px solid var(--pureWhite)', borderTopRightRadius: '0', borderBottomRightRadius: '0', borderRight: '0', opacity: '.4'}}>
                    <img src={`/images/${MdImages[4]}`} className="galleryImage" style={{borderTopRightRadius: '0', borderBottomRightRadius: '0'}} />
                </div>
            </div>

            <div
                className={`w-100 d-none d-sm-flex d-md-none justify-content-between position-relative ${extraClassNames}`}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onTouchStart={onMouseDown}
                onTouchEnd={onMouseUp}
            >
                <div style={{width: '28%', margin: '0 1%', height: '140%', borderRadius: '16px', border: '4px solid var(--pureWhite)', borderTopLeftRadius: '0', borderBottomLeftRadius: '0', borderLeft: '0', opacity: '.6'}}>
                    <img src={`/images/${SmImages[0]}`} className="galleryImage" style={{borderTopLeftRadius: '0', borderBottomLeftRadius: '0'}} />
                </div>
                <div style={{width: '38%', margin: '0 1%', height: '150%', borderRadius: '16px', border: '4px solid var(--pureWhite)'}}>
                    <img src={`/images/${SmImages[1]}`} className="galleryImage" />
                </div>
                <div style={{width: '28%', margin: '0 1%', height: '140%', borderRadius: '16px', border: '4px solid var(--pureWhite)', borderTopRightRadius: '0', borderBottomRightRadius: '0', borderRight: '0', opacity: '.6'}}>
                    <img src={`/images/${SmImages[2]}`} className="galleryImage" style={{borderTopRightRadius: '0', borderBottomRightRadius: '0'}} />
                </div>
            </div>

            <div
                className={`w-100 d-flex d-sm-none justify-content-between position-relative ${extraClassNames}`}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onTouchStart={onMouseDown}
                onTouchEnd={onMouseUp}
            >
                <div style={{width: '13%', margin: '0 1%', height: '100%', borderRadius: '16px', border: '4px solid var(--pureWhite)', borderTopLeftRadius: '0', borderBottomLeftRadius: '0', borderLeft: '0', opacity: '.6'}}>
                    <img src={`/images/${SmImages[0]}`} className="galleryImage" style={{borderTopLeftRadius: '0', borderBottomLeftRadius: '0'}} />
                </div>
                <div style={{width: '68%', margin: '0 1%', height: '110%', borderRadius: '16px', border: '4px solid var(--pureWhite)'}}>
                    <img src={`/images/${SmImages[1]}`} className="galleryImage" />
                </div>
                <div style={{width: '13%', margin: '0 1%', height: '100%', borderRadius: '16px', border: '4px solid var(--pureWhite)', borderTopRightRadius: '0', borderBottomRightRadius: '0', borderRight: '0', opacity: '.6'}}>
                    <img src={`/images/${SmImages[2]}`} className="galleryImage" style={{borderTopRightRadius: '0', borderBottomRightRadius: '0'}} />
                </div>
            </div>
        </>
    )
}