import React from 'react'
import Lottie from 'react-lottie'

export default function Settings({ hover }) {

    const defaultOptions = {
        loop: false,
        autoplay: false,
        animationData: require('../../../styles/gallery-footer/settings.json'),
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    }

    return (
        <Lottie options={defaultOptions} isStopped={!hover} />
    )
}

