import React from 'react'
import Lottie from 'react-lottie'

export default function Grid({ hover }) {

    const defaultOptions = {
        loop: true,
        autoplay: false,
        animationData: require('../../../styles/gallery-footer/grid.json'),
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    }

    return (
        <Lottie options={defaultOptions} isStopped={!hover} />
    )
}
