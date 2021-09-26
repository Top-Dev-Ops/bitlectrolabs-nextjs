import React, { useState, useEffect } from 'react'
import { animated, useSpring } from 'react-spring'

export default function LgGalleryList({ left, right, tokenSelect, tokens }) {

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
            width: '10%',
            height: '50%',
            border: '4px solid rgb(255 255 255 / 40%)',
            top: 0,
            left: '-0.16%',
            transform: 'scale(1.0)',
            opacity: .4,
            borderTopLeftRadius: '0',
            borderBottomLeftRadius: '0',
            borderTopRightRadius: '16px',
            borderBottomRightRadius: '16px',
        }, {
            width: '24.5%',
            height: '60%',
            border: '4px solid rgb(255 255 255 / 60%)',
            top: 0,
            left: '10.166%',
            transform: 'scale(1.0)',
            opacity: .6,
            borderTopLeftRadius: '16px',
            borderBottomLeftRadius: '16px',
            borderTopRightRadius: '16px',
            borderBottomRightRadius: '16px',
        }, {
            width: '30%',
            height: '70%',
            border: '4px solid rgb(255 255 255 / 100%)',
            top: 0,
            left: '35%',
            transform: 'scale(1.0)',
            opacity: 1,
            borderTopLeftRadius: '16px',
            borderBottomLeftRadius: '16px',
            borderTopRightRadius: '16px',
            borderBottomRightRadius: '16px',
        }, {
            width: '24.5%',
            height: '60%',
            border: '4px solid rgb(255 255 255 / 60%)',
            top: 0,
            left: '65.333%',
            transform: 'scale(1.0)',
            opacity: .6,
            borderTopLeftRadius: '16px',
            borderBottomLeftRadius: '16px',
            borderTopRightRadius: '16px',
            borderBottomRightRadius: '16px',
        }, {
            width: '10%',
            height: '50%',
            border: '4px solid rgb(255 255 255 / 40%)',
            top: 0,
            left: '90.2%',
            transform: 'scale(1.0)',
            opacity: .4,
            borderTopLeftRadius: '16px',
            borderBottomLeftRadius: '16px',
            borderTopRightRadius: '0',
            borderBottomRightRadius: '0',
        },
    ]

    const spring0 = useSpring({ ...styles[(tokenIndex + 0) % 5], config })
    const spring1 = useSpring({ ...styles[(tokenIndex + 1) % 5], config })
    const spring2 = useSpring({ ...styles[(tokenIndex + 2) % 5], config })
    const spring3 = useSpring({ ...styles[(tokenIndex + 3) % 5], config })
    const spring4 = useSpring({ ...styles[(tokenIndex + 4) % 5], config })
    const springs = [spring0, spring1, spring2, spring3, spring4]

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
                overflow: 'hidden'
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
                            zIndex: 5,
                            overflow: 'hidden',
                            display: 'flex'
                        }}
                        onClick={() => tokenSelect(tokens[index] === undefined ? tokens[index % tokens.length] : tokens[index])}
                    >
                        <animated.img
                            src={images[index] === undefined ? images[index % tokens.length] : images[index]}
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
                                    {tokens[index] === undefined ? tokens[index % tokens.length].token_id : tokens[index].token_id}
                                </span>
                                <span className="mx-1">
                                    {tokens[index] === undefined ? (
                                        tokens[index % tokens.length].owner.user !== null && tokens[index % tokens.length].owner.user.name
                                    ) : tokens[index].owner.user !== null && tokens[index].owner.user.username}
                                </span>
                            </marquee>
                        )}
                    </animated.div>
                )
            })}
        </div>
    )
}