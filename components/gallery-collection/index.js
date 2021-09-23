import React, { useState } from 'react'

import { CloseFilter } from '../custom/svgs/Close'
import SoundSwitch from '../custom/SoundSwitch'
import VolumeControl from '../custom/VolumeControl'
import Download from '../custom/svgs/Download'

export default function GalleryCollection({ extraClassNames, extraStyles, onClose }) {
    const [images, setImages] = useState(
        ['1.png', '2.png', '3.png', '4.png', '9.png', '10.png', '11.png']
    )

    const [start, setStart] = useState(0)

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

    const slideLeft = () => {
        const [first, ...rest] = images
        const temp = [...rest, first]
        setImages(temp)
    }

    const slideRight = () => {
        const last = images.slice(-1)
        const rest = images.slice(0, -1)
        const temp = [last, ...rest]
        setImages(temp)
    }

    return (
        <section
            className={`gallery-collection ${extraClassNames}`}
            style={extraStyles}
        >
            <CloseFilter
                style={{width: '40px', height: '40px'}}
                onClick={onClose}
            />

            <div
                className={`w-100 d-flex justify-content-between position-relative`}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onTouchStart={onMouseDown}
                onTouchEnd={onMouseUp}
            >
                <div style={{width: '26%', height: '90%', borderRadius: '16px', border: '4px solid rgb(255 255 255 / 60%)', borderTopLeftRadius: '0', borderBottomLeftRadius: '0', borderLeft: '0'}}>
                    <img
                        src={`/images/${images[0]}`}
                        className="galleryImage"
                        style={{borderTopLeftRadius: '0', borderBottomLeftRadius: '0', opacity: '.6'}}
                    />
                </div>
                <div style={{width: '45%', margin: '0 1%', height: '100%', borderRadius: '16px', border: '4px solid var(--pureWhite)'}}>
                    <img
                        src={`/images/${images[1]}`}
                        className="galleryImage"
                    />
                </div>
                <div style={{width: '26%', height: '90%', borderRadius: '16px', border: '4px solid rgb(255 255 255 / 60%)', borderTopRightRadius: '0', borderBottomRightRadius: '0', borderRight: '0'}}>
                    <img
                        src={`/images/${images[2]}`}
                        className="galleryImage"
                        style={{borderTopRightRadius: '0', borderBottomRightRadius: '0', opacity: '.6'}}
                    />
                </div>
            </div>

            <div className="w-100 d-flex justify-content-between align-items-center px-4">
                <SoundSwitch />
                <VolumeControl />
                <Download />
            </div>
        </section>
    )
}