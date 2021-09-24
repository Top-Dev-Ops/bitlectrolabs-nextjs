import React, { useEffect } from 'react'
import gsap from 'gsap'

const VerticalCarousel = ({ tokens }) => {

    const animateCarousel = (targetName, _duration) => {
        const { innerWidth } = window;
        const count = 10

        const gap = innerWidth > 1600 ? 20 :
            innerWidth > 1160 ? 15 :
                innerWidth > 1024 ? 12 :
                    innerWidth > 768 ? 8 :
                        innerWidth > 576 ? 6 : 8

        const boxHeight = innerWidth > 1600 ? 200 :
            innerWidth > 1160 ? 160 :
                innerWidth > 1024 ? 114 :
                    innerWidth > 768 ? 100 :
                        innerWidth > 576 ? 90 : 114


        const posToHide = document.querySelector(".hero").clientHeight + boxHeight + 110;

        const totalHeight = boxHeight * count + gap * count
        const ele = document.querySelectorAll(targetName)
        const dirFromTop = "+=" + totalHeight

        var mod = gsap.utils.wrap(0, totalHeight)

        gsap.set(ele, {
            y: function (i) {
                return i * (boxHeight + gap)
            }
        })


        const _timeline = gsap.timeline()
        _timeline.to(ele, {
            y: dirFromTop,
            modifiers: {
                y: x => mod(parseFloat(x)) + "px"
            },
            duration: _duration, ease: 'none',
            onUpdate: () => {
                ele.forEach(e => {
                    const values = e.style.transform.split(/\w+\(|\);?/);
                    const pxY = values[1].split(/,\s?/g)[1];
                    const y = parseInt(pxY.split('px')[0])
                    e.style.display = y > posToHide ? 'none' : 'block'
                })
            },
            repeat: -1,
        });
        return _timeline;
    }

    useEffect(() => {
        let t1 = animateCarousel(".custom-carousel-col-1 .carousel-image-box", 23)
        let t2 = animateCarousel(".custom-carousel-col-2 .carousel-image-box", 23)

        window.addEventListener('resize', () => {
            t1.kill()
            t2.kill()
            t1 = animateCarousel(".custom-carousel-col-1 .carousel-image-box", 23)
            t2 = animateCarousel(".custom-carousel-col-2 .carousel-image-box", 23)
        });

    }, [])

    return (<section className="row">
        <div className="custom-carousel-col-1">
            {tokens.filter((token, index) => index < 10).map((token) => (
                <div key={token.id} className="carousel-image-box">
                    <img src={token.image_original_url} />
                </div>
            ))}
        </div>

        <div className="custom-carousel-col-2">
            {tokens.filter((token, index) => index >= 10).map((token) => (
                <div key={token.id} className="carousel-image-box">
                    <img src={token.image_original_url} />
                </div>
            ))}
        </div>
    </section>)
}

export default VerticalCarousel