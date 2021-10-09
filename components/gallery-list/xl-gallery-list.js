import React, { useState, useEffect } from 'react'
import { animated, useSpring } from 'react-spring'
import gsap from 'gsap'

export default function XlGalleryList({
    left,
    right,
    tokenSelect,
    tokenHover,
    tokens
}) {

    const [tokenIndex, setTokenIndex] = useState(0)
    const [startXCoordinate, setStartXCoordinate] = useState(0)
    const [hover, setHover] = useState('')
    const [images, setImages] = useState(tokens.map(token => token.image_original_url))
    const [isUpdated, setIsUpdated] = useState(true)
    const [isLoaded, setIsLoaded] = useState(false)

    const config = {
        mass: 1,
        tension: 300,
        friction: 35,
    }

    const { innerWidth } = window
    
    const styles = [
        {
            width: `${0.097 * innerWidth - 32}px`,
            height: '260px',
            border: '4px solid rgb(255 255 255 / 40%)',
            top: 0,
            left: `${0.375 * innerWidth / 100}px`,
            transform: 'scale(1.0)',
            opacity: .4,
        }, {
            width: `${0.1746 * innerWidth - 57.6}px`,
            height: '280px',
            border: '4px solid rgb(255 255 255 / 60%)',
            top: 0,
            left: `${0.1045 * innerWidth - 32}px`,
            transform: 'scale(1.0)',
            opacity: .6,
        }, {
            width: `${0.2134 * innerWidth - 70.4}px`,
            height: '300px',
            border: '4px solid rgb(255 255 255 / 80%)',
            top: 0,
            left: `${0.28285 * innerWidth - 89.6}px`,
            transform: 'scale(1.0)',
            opacity: .8,
        }, {
            width: '320px',
            height: '320px',
            border: '4px solid rgb(255 255 255 / 100%)',
            top: 0,
            left: `${innerWidth / 2 - 160}px`,
            transform: 'scale(1.0)',
            opacity: 1,
        }, {
            width: `${0.2134 * innerWidth - 70.4}px`,
            height: '300px',
            border: '4px solid rgb(255 255 255 / 80%)',
            top: 0,
            left: `${0.50375 * innerWidth + 160}px`,
            transform: 'scale(1.0)',
            opacity: .8,
        }, {
            width: `${0.1746 * innerWidth - 57.6}px`,
            height: '280px',
            border: '4px solid rgb(255 255 255 / 60%)',
            top: 0,
            left: `${0.7209 * innerWidth + 89.6}px`,
            transform: 'scale(1.0)',
            opacity: .6,
        }, {
            width: `${0.097 * innerWidth - 32}px`,
            height: '260px',
            border: '4px solid rgb(255 255 255 / 40%)',
            top: 0,
            left: `${0.89925 * innerWidth + 32}px`,
            transform: 'scale(1.0)',
            opacity: .4,
        },
    ]

    const spring0 = useSpring({ ...styles[(tokenIndex + 0) % 7], config })
    const spring1 = useSpring({ ...styles[(tokenIndex + 1) % 7], config })
    const spring2 = useSpring({ ...styles[(tokenIndex + 2) % 7], config })
    const spring3 = useSpring({ ...styles[(tokenIndex + 3) % 7], config })
    const spring4 = useSpring({ ...styles[(tokenIndex + 4) % 7], config })
    const spring5 = useSpring({ ...styles[(tokenIndex + 5) % 7], config })
    const spring6 = useSpring({ ...styles[(tokenIndex + 6) % 7], config })
    const springs = [spring0, spring1, spring2, spring3, spring4, spring5, spring6]

    const slideLeft = () => {
        setIsUpdated(!isUpdated)
        setTokenIndex(tokenIndex === 0 ? tokens.length - 1 : tokenIndex - 1)
        if (isUpdated) {
            const [first, ...rest] = [...images]
            setImages([...rest, first])
        }
    }
    const slideRight = () => {
        setIsUpdated(!isUpdated)
        setTokenIndex(tokenIndex === tokens.length - 1 ? 0 : tokenIndex + 1)
        if (isUpdated) {
            const pictures = [...images]
            const last = pictures.pop()
            setImages([last, ...pictures])
        }
    }

    useEffect(() => slideRight(), [left])
    useEffect(() => slideLeft(), [right])

    const animateSkeleton = () => {
        const totalWidth = 300
        const ele = document.querySelectorAll('.skeleton-gradient')
        let dirFromLeft = "+=" + totalWidth
    
        const mod = gsap.utils.wrap(0, totalWidth)
        const t1 = gsap.timeline()
        t1.to(ele, {
            x: dirFromLeft,
            modifiers: {
                x: x => mod(parseFloat(x)) + "px"
            },
            duration: 2,
            ease: 'none',
            repeat: -1
        })
    }

    useEffect(() => {
        animateSkeleton()

        const onTimer = () => setIsLoaded(true)

        const timer = setTimeout(onTimer, 2000)
        return () => clearTimeout(timer)
    }, [])

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                position: 'relative',
            }}
            onMouseDown={(e) => {
                e.preventDefault()
                setStartXCoordinate(e.clientX)
            }}
            onMouseUp={(e) => {
                e.preventDefault()
                if (Math.abs(startXCoordinate - e.clientX) > 150 && startXCoordinate > e.clientX) {
                    slideLeft()
                } else if (Math.abs(startXCoordinate - e.clientX) > 150 && startXCoordinate < e.clientX) {
                    slideRight()
                }
            }}
        >
            {styles.map((props, index) => {
                const { transform, ...anim } = springs[index]
                return (
                    <animated.div
                        key={`animated_div_${index}`}
                        style={{
                            ...anim,
                            position: 'absolute',
                            borderRadius: '16px',
                            zIndex: 7,
                            overflow: 'hidden',
                            display: 'flex',
                        }}
                        onClick={() => tokenSelect(tokens[index])}
                    >
                        <div className="position-relative w-100">
                            <animated.img
                                src={isLoaded? images[index] : '/images/skeleton.png'}
                                style={{
                                    transform,
                                    height: '100%',
                                    width: '100%',
                                    position: 'absolute',
                                    objectFit: 'cover',
                                }}
                                onMouseEnter={() => {setHover(index); tokenHover(tokens[index])}}
                                onMouseLeave={() => {setHover(''); tokenHover(null)}}
                            />

                            <div
                                className={`h-100 skeleton-gradient ${isLoaded ? 'd-none' : 'd-block'}`}
                                style={{
                                    position: 'absolute',
                                    width: '100px', 
                                    top: '0', 
                                    left: '-30px', 
                                    background: 'linear-gradient(90deg, #212226 0%, #2D2E33 50.52%, #212226 100%)',
                                    zIndex: '3'
                                }}
                            />
                        </div>
                        {isLoaded && hover === index && (
                            <marquee className="marquee" onMouseEnter={() => setHover(index)}>
                                <span className="mx-1">
                                    {tokens[index].token_id}
                                </span>
                                <span className="mx-1">
                                    {tokens[index].owner.user !== null && tokens[index].owner.user.username}
                                </span>
                            </marquee>
                        )}
                    </animated.div>
                )
            })}
        </div>
    )
}