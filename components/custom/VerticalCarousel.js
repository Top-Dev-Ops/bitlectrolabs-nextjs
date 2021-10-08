import React, { useState, useEffect } from 'react'
import gsap from 'gsap'

const VerticalCarousel = ({ tokens }) => {

    let scatter = false
    let scatterLimit

    const [isLoaded, setIsLoaded] = useState(false)

    const shuffle = (array) => {
        let currentIndex = array.length
        let randomIndex

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex--
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
        }
        return array
    }

    const animateCarousel = (targetName, _duration) => {
        const { innerWidth } = window
        const count = 60

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

        scatterLimit =  innerWidth > 1600 ? 1200 :
            innerWidth > 1160 ? 900 :
                innerWidth > 1024 ? 700 :
                    innerWidth > 768 ? 400 : 300

        const posToHide = document.querySelector(".hero").clientHeight + boxHeight + 110

        const totalHeight = boxHeight * count + gap * count
        const ele = document.querySelectorAll(targetName)
        const dirFromTop = "+=" + totalHeight

        var mod = gsap.utils.wrap(0, totalHeight)

        gsap.set(ele, {
            y: function (i) {
                return i * (boxHeight + gap)
            }
        })

        const diffs = []
        for (let i = 0; i < ele.length; ++i) {
            diffs[i] = -Math.random() * 500
        }

        const _timeline = gsap.timeline()
        _timeline.to(ele, {
            y: dirFromTop,
            modifiers: {
                y: x => mod(parseFloat(x)) + "px"
            },
            duration: _duration, ease: 'none',
            onUpdate: () => {
                ele.forEach((e, i) => {
                    if (scatter) {
                        gsap.to(e, { duration: 1.5, left: diffs[i] })
                    } else {
                        gsap.to(e, { duration: 1, left: 0 })
                    }
                    const values = e.style.transform.split(/\w+\(|\);?/)
                    const pxY = values[1].split(/,\s?/g)[1]
                    const y = parseInt(pxY.split('px')[0])
                    e.style.display = y > posToHide ? 'none' : 'block'
                })
            },
            repeat: -1,
        })
        return _timeline
    }

    // const animateSkeleton = () => {
    //     const ele = document.querySelectorAll('.skeleton-gradient')
    //     let dirFromLeft = "+=" + totalWidth

    //     const mod = gsap.utils.wrap(0, totalWidth)
    //     const t1 = gsap.timeline()
    //     t1.to(ele, {
    //         x: dirFromLeft,
    //         modifiers: {
    //             x: x => mod(parseFloat(x)) + 'px'
    //         },
    //         duration: 2,
    //         ease: 'none',
    //         repeat: -1
    //     })
    // }

    useEffect(() => {
        // animateSkeleton()
        let t1 = animateCarousel(".custom-carousel-col-1 .carousel-image-box", 70)
        let t2 = animateCarousel(".custom-carousel-col-2 .carousel-image-box", 70)

        const resize = () => {
            t1.kill()
            t2.kill()
            t1 = animateCarousel(".custom-carousel-col-1 .carousel-image-box", 70)
            t2 = animateCarousel(".custom-carousel-col-2 .carousel-image-box", 70)
        }

        const mousemove = (e) => {
            if(e.clientX < scatterLimit){
                scatter = false
                return
            }
            scatter = true
        }

        window.addEventListener('resize', resize)
        window.addEventListener('mousemove', mousemove)

        const onTimer = () => setIsLoaded(true)
        const timer = () => setTimeout(onTimer, 2000)

        return () => {
            window.removeEventListener('resize', resize)
            window.removeEventListener('mousemove', mousemove)
            clearTimeout(timer)
        }
    }, [])

    return (<section className="row">
        <div className="custom-carousel-col-1">
            {[...Array(61).keys()].map(index => (
                <div key={`vertical_carousel_1_${index}`} className="carousel-image-box">
                    <div className="position-relative w-100 h-100">
                        <img src={`/images/gifs/${index}.gif`} className="w-100 h-100" />
                        {/* <img
                            src={isLoaded ? `/images/gifs/${index}.gif` : '/images/skeleton.png'}
                            className="w-100 h-100"
                        /> */}

                        {/* <div
                            className={`h-100 skeleton-gradient ${isLoaded ? 'd-none' : 'd-block'}`}
                            style={{
                                position: 'absolute', 
                                width: '70px',
                                top: '0', 
                                left: '0', 
                                background: 'linear-gradient(90deg, #212226 0%, #2D2E33 50.52%, #212226 100%)',
                                zIndex: 1
                            }}
                        /> */}
                    </div>
                </div>
            ))}
        </div>

        <div className="custom-carousel-col-2">
            {[...Array(61).keys()].reverse().map(index => (
                <div key={`vertical_carousel_2_${index}`} className="carousel-image-box">
                    <div className="position-relative w-100 h-100">
                        <img src={`/images/gifs/${index}.gif`} className="w-100 h-100" />
                    </div>
                </div>
            ))}
        </div>
    </section>)
}

export default VerticalCarousel