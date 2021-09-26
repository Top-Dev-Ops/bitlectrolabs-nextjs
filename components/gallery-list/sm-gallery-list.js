import React, { useState, useEffect } from 'react'
import { animated, useSpring } from 'react-spring'

export default function SmGalleryList({ left, right, tokenSelect, tokens }) {

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
            width: '213px',
            height: '213px',
            border: '4px solid rgb(255 255 255 / 60%)',
            top: 0,
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
            top: 0,
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
            top: 0,
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
                        onClick={() => tokenSelect(tokens[index] === undefined ? tokens[index % tokens.length] : tokens[index])}
                    >
                        <animated.img
                            src={images[index] === undefined ? images[index % tokens.length]: images[index]}
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