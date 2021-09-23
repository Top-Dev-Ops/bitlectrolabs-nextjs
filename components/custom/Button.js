import { useState, useEffect } from "react"

import Arrow from "./svgs/Arrow"

export default function Button({ icon, text, variant, onClick }) {
    const style = variant === 'primary' ?
    'custom-button-primary' : variant === 'outline-sm' ?
    'custom-button-outline-sm' : 'custom-button-outline'

    return (
        <div>
            <button
                className={`btn btn-sm ${style}`}
                onClick={onClick}
            >
                {icon}
                <span>{text}</span>
            </button>
        </div>
    )
}

export const ArrowButton = ({ direction, onClick, extraClassNames }) => {
    return (
        <button
            className={`border-0 outline-0 custom-button-arrow ${extraClassNames}`}
            onClick={onClick}
        >
            <Arrow direction={direction} />
        </button>
    )
}

export const TextButton = ({ text, onClick, variant, extraClassNames, extraStyles }) => {
    const classNames = variant === 'primary' ?
    'custom-button-text-primary' : variant === 'secondary' ?
    'custom-button-text-secondary' : variant === 'underlined' ?
    'custom-button-text-underlined' : 'custom-button-text'

    return (
        <button
            className={`${classNames} border-0 ${extraClassNames}`}
            style={extraStyles}
            onClick={onClick}
        >
            {text}
        </button>
    )
}

export const SVGButton = ({ icon, badge, onClick, extraClassNames, onMouseEnter, onMouseLeave }) => {
    return (
        <button
            className={`custom-button-svg position-relative border-0 ${extraClassNames}`}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {icon}
            
            <div className="badge">{badge}</div>
        </button>
    )
}

export const RadioButton = ({ text, onChange, reset }) => {
    const [checked, setChecked] = useState(false)

    const onClick = () => {
        if (onChange) onChange(!checked, text)
        setChecked(!checked)
    }

    useEffect(() => setChecked(false), [reset])

    return (
        <section>
            <div className="radio-button" onClick={onClick}>
                <div className={checked && 'checked'} />

                <span>{text}</span>
            </div>

            <style jsx>{`
                .radio-button {
                    display: inline-block;
                }
                .radio-button:hover {
                    cursor: pointer;
                }
                span {
                    margin-left: 10px;
                    color: var(--pureWhite);
                    font-size: var(--textMd);
                    vertical-align: middle;
                }
                .radio-button > div {
                    width: 20px;
                    height: 20px;
                    background: var(--midGray600);
                    position: relative;
                    border-radius: 50%;
                    display: inline-block;
                    vertical-align: middle;
                }
                .radio-button > div.checked:after {
                    content: '';
                    display: block;
                    position: absolute;
                    top: 6px;
                    left: 6px;
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: var(--pureWhite);
                }
            `}</style>
        </section>
    )
}