import gsap from 'gsap'
import { useEffect } from 'react'

const HorizontalCarousel = () => {

    const animateCarousel = (targetName, _duration) => {
        const count = 5
        const gap = 20

        var boxWidth = 200,
            totalWidth = boxWidth * count + gap * count,  // * n of boxes + diff textBox
            ele = document.querySelectorAll(targetName),
            dirFromLeft = "+=" + totalWidth

        var mod = gsap.utils.wrap(0, totalWidth)

        gsap.set(ele, {
            x: function (i) {
                return i * (boxWidth + gap)
            }
        })

        const t1 = gsap.timeline()
        t1.to(ele, {
            x: dirFromLeft,
            modifiers: {
                x: x => mod(parseFloat(x)) + "px"
            },
            duration: _duration, ease: 'none',
            repeat: -1,
        })
    }

    useEffect(() => {
        animateCarousel(".horizontal-carousel .carousel-image-box", 20)
    }, [])


    return (
        <section className="horizontal-carousel">
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
                <img src='/images/2.png' />
            </div>
            <div className="carousel-image-box">
                <img src='/images/3.png' />
            </div>

        </section>
    )
}

export default HorizontalCarousel