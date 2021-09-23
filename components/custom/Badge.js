const Badge = ({ text, extraClassNames, size }) => {
    const fontSize = size === 'Lg' ? '18px' : '16px'

    return (
        <div className={extraClassNames}>
            <span
                className="custom-badge"
                style={{fontSize: fontSize}}
            >
                {text}
            </span>
        </div>
    )
}

export default Badge