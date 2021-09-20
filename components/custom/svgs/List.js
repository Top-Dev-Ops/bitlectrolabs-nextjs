import React from 'react'
import Lottie from 'react-lottie'

export default function List({ hover }) {

    const defaultOptions = {
        loop: true,
        autoplay: false,
        animationData: require('../../../styles/gallery-footer/list.json'),
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    }

    return (
        <Lottie options={defaultOptions} isStopped={!hover} />
    )
}