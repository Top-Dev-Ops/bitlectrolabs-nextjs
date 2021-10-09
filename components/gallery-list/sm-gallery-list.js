import React, { useState, useEffect } from 'react'
import { animated, useSpring } from 'react-spring'
import gsap from 'gsap'

export default function SmGalleryList({
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

    const styles = [
        {
            width: '213px',
            height: '213px',
            border: '4px solid rgb(255 255 255 / 60%)',
            top: '10%',
            left: 'calc(0% - 100px)',
            transform: 'scale(1.0)',
            opacity: .6,
            borderTopLeftRadius: '0',
            borderBottomLeftRadius: '0',
            borderTopRightRadius: '16px',
            borderBottomRightRadius: '16px',
            zIndex: 2,
        }, {
            width: '230px',
            height: '230px',
            border: '4px solid rgb(255 255 255 / 100%)',
            top: '10%',
            left: 'calc(50% - 109px)',
            transform: 'scale(1.0)',
            opacity: 1,
            borderTopLeftRadius: '16px',
            borderBottomLeftRadius: '16px',
            borderTopRightRadius: '16px',
            borderBottomRightRadius: '16px',
            zIndex: 3,
        }, {
            width: '213px',
            height: '213px',
            border: '4px solid rgb(255 255 255 / 60%)',
            top: '10%',
            left: 'calc(100% - 100px)',
            transform: 'scale(1.0)',
            opacity: .6,
            borderTopLeftRadius: '16px',
            borderBottomLeftRadius: '16px',
            borderTopRightRadius: '0',
            borderBottomRightRadius: '0',
            zIndex: 2,
        },
    ]

    const spring0 = useSpring({ ...styles[(tokenIndex + 0) % 3], config })
    const spring1 = useSpring({ ...styles[(tokenIndex + 1) % 3], config })
    const spring2 = useSpring({ ...styles[(tokenIndex + 2) % 3], config })
    const springs = [spring0, spring1, spring2]

    const slideLeft = () => {
        setIsUpdated(!isUpdated)
        setTokenIndex(tokenIndex === 0 ? images.length - 1 : tokenIndex - 1)
        if (isUpdated) {
            const [first, ...rest] = [...images]
            setImages([...rest, ...first])
        }
    }
    const slideRight = () => {
        setIsUpdated(!isUpdated)
        setTokenIndex(tokenIndex === images.length - 1 ? 0 : tokenIndex + 1)
        if (isUpdated) {
            const pictures = [...images]
            const last = pictures.pop()
            setImages([last, ...pictures])
        }
    }

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

    useEffect(() => slideRight(), [left])
    useEffect(() => slideLeft(), [right])

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                overflow: 'hidden',
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
                            zIndex: 3,
                            overflow: 'hidden',
                            display: 'flex'
                        }}
                        onClick={() => tokenSelect(tokens[index])}
                    >
                        <div className="position-relative w-100">
                            <animated.img
                                src={isLoaded ? images[index] : '/images/skeleton.png'}
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