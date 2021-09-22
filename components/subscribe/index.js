import React, { useState } from 'react'
import Button from '../custom/Button'

const Subscribe = () => {
    const [focus, setFocus] = useState(false)
    const [hover, setHover] = useState(false)

    const onFocus = () => {
        setFocus(true)
    }

    const onBlur = () => {
        setFocus(false)
    }

    const onMouseEnter = () => {
        setHover(true)
    }

    const onMouseLeave = () => {
        setHover(false)
    }

    return <section className="subscribe-container">
        <h4>Sign up for first access</h4>
        <p>Enter your email address to learn about ongoing Bitlectro releases, features, and events</p>

        <div
            className="subscribe-button"
            style={{ borderColor: `${ focus? '#7C808A' : hover ? '#4A4C52' : 'var(--midGray900)' }` }}
        >
            <input
                type="email"
                placeholder="Email"
                onFocus={onFocus}
                onBlur={onBlur}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            />
            <Button text={'Subscribe'} variant={'outline-sm'} />
        </div>
    </section>
}

export default Subscribe