import React, {useEffect} from 'react'
import gsap from 'gsap'

const VerticalCarousel = () => {

    const animateCarousel = (targetName, _duration) => {
        const { innerWidth } = window

        const count = 7
        const gap = innerWidth < 1160 ? -20 : 20

        var boxHeight = 200,
            totalHeight = boxHeight * count + gap * count,
            ele = document.querySelectorAll(targetName),
            dirFromTop = "+=" + totalHeight

        var mod = gsap.utils.wrap(0, totalHeight)

        gsap.set(ele, {
            y: function (i) {
                return i * (boxHeight + gap)
            }
        })

        const t1 = gsap.timeline()
        t1.to(ele, {
            y: dirFromTop,
            modifiers: {
                y: x => mod(parseFloat(x)) + "px"
            },
            duration: _duration, ease: 'none',
            repeat: -1,
        })
    }

    useEffect(() => {
        animateCarousel(".custom-carousel-col-1 .carousel-image-box", 20)
        animateCarousel(".custom-carousel-col-2 .carousel-image-box", 20)
    }, [])

    return (<section className="row">
        <div className="custom-carousel-col-1">
            <div className="carousel-image-box">
                <img src='/images/1.png' />
            </div>
            <div className="carousel-image-box">
                <img src='/images/2.png' />
            </div>
            <div className="carousel-image-box">
                <img src='/images/3.png' />
            </div>
            <div className="carousel-image-box">
                <img src='/images/1.png' />
            </div>
            <div className="carousel-image-box">
                <img src='/images/2.png' />
            </div>
            <div className="carousel-image-box">
                <img src='/images/2.png' />
            </div>
            <div className="carousel-image-box">
                <img src='/images/2.png' />
            </div>
        </div>

        <div className="custom-carousel-col-2">
            <div className="carousel-image-box">
                <img src='/images/2.png' />
            </div>
            <div className="carousel-image-box">
                <img src='/images/3.png' />
            </div>
            <div className="carousel-image-box">
                <img src='/images/1.png' />
            </div>
            <div className="carousel-image-box">
                <img src='/images/2.png' />
            </div>
            <div className="carousel-image-box">
                <img src='/images/3.png' />
            </div>
            <div className="carousel-image-box">
                <img src='/images/3.png' />
            </div>
            <div className="carousel-image-box">
                <img src='/images/3.png' />
            </div>
        </div>
    </section>)
}

export default VerticalCarousel