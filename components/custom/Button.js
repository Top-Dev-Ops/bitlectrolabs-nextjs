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

export const ArrowButton = ({ direction, onClick, onMouseDown, onMouseUp, extraClassNames }) => {
    return (
        <button
            className={`border-0 outline-0 custom-button-arrow ${extraClassNames}`}
            onMouseDown={() => { onMouseDown !== undefined && onMouseDown(direction) }}
            onMouseUp={() => { onMouseUp !== undefined && onMouseUp(direction) }}
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
    'custom-button-text-underlined' : variant === 'tertiary' ?
    'custom-button-text-tertiary' : 'custom-button-text'

    return (
        <button
            className={`${classNames} text-capitalize border-0 ${extraClassNames}`}
            style={extraStyles}
            onClick={onClick}
        >
            {text.includes('_') ? text.split('_')[0] : text}
        </button>
    )
}

export const SVGButton = ({ icon, badge, onClick, extraClassNames, extraStyles, onMouseEnter, onMouseLeave }) => {
    return (
        <button
            className={`custom-button-svg position-relative border-0 ${extraClassNames}`}
            style={extraStyles}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {icon}
            
            <div className="badge">{badge}</div>
        </button>
    )
}

export const RadioButton = ({ text, onChange, reset, extraClassNames, checked }) => {
    
    return (
        <section className={extraClassNames}>
            <div className="radio-button" onClick={() => onChange(!checked, text)}>
                <div className={checked ? 'checked' : undefined} />

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