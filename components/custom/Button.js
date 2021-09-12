import Arrow from "./svgs/Arrow"

const Button = ({ icon, text, variant, onClick }) => {
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
        <button className={`btn btn-sm border-0 custom-button-arrow ${extraClassNames}`} onClick={onClick}>
            <Arrow direction={direction} />
        </button>
    )
}

export const TextButton = ({ text, onClick, extraClassNames}) => {
    return (
        <button className={`custom-button-text border-0 ${extraClassNames}`} onClick={onClick}>
            {text}
        </button>
    )
}

export const SVGButton = ({ icon, onClick, extraClassNames }) => {
    return (
        <button className={`custom-button-svg border-0 ${extraClassNames}`} onClick={onClick}>
            {icon}
        </button>
    )
}

export default Button