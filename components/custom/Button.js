import {
    IoMdArrowDropup,
    IoMdArrowDropdown,
    IoMdArrowDropleft,
    IoMdArrowDropright
} from 'react-icons/io'

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
        <button className={`btn btn-sm custom-button-arrow ${extraClassNames}`} onClick={onClick}>
            {direction === 'up' ?
                <IoMdArrowDropup color="white" /> :
                direction === 'down' ?
                    <IoMdArrowDropdown color="white" /> :
                    direction === 'left' ?
                        <IoMdArrowDropleft color="white" /> :
                        <IoMdArrowDropright color="white" />
            }
        </button>
    )
}

export default Button