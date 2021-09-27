import React, { useState, useEffect } from 'react'
import { animated, useSpring } from 'react-spring'

export default function XlGalleryList({ left, right, tokenSelect, tokens }) {

    const [tokenIndex, setTokenIndex] = useState(0)
    const [startXCoordinate, setStartXCoordinate] = useState(0)
    const [hover, setHover] = useState('')

    const config = {
        mass: 1,
        tension: 300,
        friction: 35,
    }

    const images = tokens.map(token => token.image_original_url)

    const styles = [
        {
            width: '5.5%',
            height: '70%',
            border: '4px solid rgb(255 255 255 / 40%)',
            top: 0,
            left: '0.375%',
            transform: 'scale(1.0)',
            opacity: .4,
        }, {
            width: '11.5%',
            height: '80%',
            border: '4px solid rgb(255 255 255 / 60%)',
            top: 0,
            left: '6.25%',
            transform: 'scale(1.0)',
            opacity: .6,
        }, {
            width: '17.5%',
            height: '90%',
            border: '4px solid rgb(255 255 255 / 80%)',
            top: 0,
            left: '18.125%',
            transform: 'scale(1.0)',
            opacity: .8,
        }, {
            width: '28%',
            height: '100%',
            border: '4px solid rgb(255 255 255 / 100%)',
            top: 0,
            left: '36%',
            transform: 'scale(1.0)',
            opacity: 1,
        }, {
            width: '17.5%',
            height: '90%',
            border: '4px solid rgb(255 255 255 / 80%)',
            top: 0,
            left: '64.375%',
            transform: 'scale(1.0)',
            opacity: .8,
        }, {
            width: '11.5%',
            height: '80%',
            border: '4px solid rgb(255 255 255 / 60%)',
            top: 0,
            left: '82.25%',
            transform: 'scale(1.0)',
            opacity: .6,
        }, {
            width: '5.5%',
            height: '70%',
            border: '4px solid rgb(255 255 255 / 40%)',
            top: 0,
            left: '94.125%',
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

    const slideLeft = () => setTokenIndex(tokenIndex === 0 ? images.length - 1 : tokenIndex - 1)
    const slideRight = () => setTokenIndex(tokenIndex === images.length - 1 ? 0 : tokenIndex + 1)

    useEffect(() => slideLeft(), [left])
    useEffect(() => slideRight(), [right])

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
                            display: 'flex'
                        }}
                        onClick={() => tokenSelect(tokens[index])}
                    >
                        <animated.img
                            src={images[index]}
                            style={{
                                transform,
                                height: '100%',
                                width: '100%',
                                position: 'absolute',
                                objectFit: 'cover',
                            }}
                            onMouseEnter={() => setHover(index)}
                            onMouseLeave={() => setHover('')}
                        />
                        {hover === index && (
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