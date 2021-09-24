import React, { useState, useEffect, useRef } from 'react'

import { CloseFilter } from '../custom/svgs/Close'
import SoundSwitch from '../custom/SoundSwitch'
import VolumeControl from '../custom/VolumeControl'
import Download from '../custom/svgs/Download'

export default function GalleryCollection({
    extraClassNames,
    extraStyles,
    onClose,
    token,
}) {
    const [audioOnOff, setAudioOnOff] = useState(true)
    const [volume, setVolume] = useState(50)
    const audio = useRef(null)

    useEffect(() => {
        if (audioOnOff) {
            audio.current.play()
        } else {
            audio.current.pause()
        }
        audio.current.volume = volume / 100
    }, [audioOnOff, volume])

    return (
        <section
            className={`gallery-collection ${extraClassNames}`}
            style={extraStyles}
        >
            <CloseFilter
                style={{width: '40px', height: '40px'}}
                onClick={() => onClose(null)}
            />

            <div className={`w-100 d-flex justify-content-between position-relative`}>
                <div style={{width: '26%', height: '90%', borderRadius: '16px', border: '4px solid rgb(255 255 255 / 60%)', borderTopLeftRadius: '0', borderBottomLeftRadius: '0', borderLeft: '0'}}>
                    <img
                        src={token.asset_contract.image_url}
                        className="galleryImage"
                        style={{borderTopLeftRadius: '0', borderBottomLeftRadius: '0', opacity: '.6'}}
                    />
                </div>
                <div style={{width: '45%', margin: '0 1%', height: '100%', borderRadius: '16px', border: '4px solid var(--pureWhite)'}}>
                    <img
                        src={token.image_original_url}
                        className="galleryImage"
                    />
                </div>
                <div style={{width: '26%', height: '90%', borderRadius: '16px', border: '4px solid rgb(255 255 255 / 60%)', borderTopRightRadius: '0', borderBottomRightRadius: '0', borderRight: '0'}}>
                    <img
                        src={token.collection.image_url}
                        className="galleryImage"
                        style={{borderTopRightRadius: '0', borderBottomRightRadius: '0', opacity: '.6'}}
                    />
                </div>
            </div>

            <div className="w-100 d-flex justify-content-between align-items-center px-4">
                <SoundSwitch
                    onOff={audioOnOff}
                    setOnOff={setAudioOnOff}
                />
                <VolumeControl
                    volume={volume}
                    setVolume={setVolume}
                />
                <Download />
            </div>

            <audio ref={audio} loop>
                <source src={token.animation_url} type="audio/mp3" />
                Your browser does not support the audio element.
            </audio>
        </section>
    )
}