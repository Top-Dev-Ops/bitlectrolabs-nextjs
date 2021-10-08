import React, { useState } from 'react'
import MailchimpSubscribe from 'react-mailchimp-subscribe'
import Button from '../custom/Button'

const SubscribeForm = () => {
    return (
        <MailchimpSubscribe
            url={process.env.NEXT_PUBLIC_MAILCHIMP_URL}
            render={(props) => {
                const { subscribe, status, message } = props || {}

                return (
                    <Subscribe
                        status={status}
                        message={message}
                        onValidated={formData => subscribe(formData)}
                    />
                )
            }}
        />
    )
}

const Subscribe = ({ subscribe, message, onValidated }) => {

    const [focus, setFocus] = useState(false)
    const [hover, setHover] = useState(false)
    const [email, setEmail] = useState(null)
    const [error, setError] = useState(null)

    const onFocus = () => setFocus(true)
    const onBlur = () => setFocus(false)
    const onMouseEnter = () => setHover(true)
    const onMouseLeave = () => setHover(false)
    
    const onKeyUp = e => {
        setError(null)
        if (e.keyCode === 13) {
            e.preventDefault()
            submit()
        }
    }

    const submit = () => {
        setError(null)

        if (!email) {
            setError('Please enter a valid email address')
            return null
        }

        const isFormValidated = onValida
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
                onChange={e => setEmail(e.target.value)}
                onKeyUp={onKeyUp}
            />
            <Button text={'Subscribe'} variant={'outline-sm'} />
        </div>
    </section>
}

export default SubscribeForm