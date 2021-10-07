const CardLayout = ({ variant, children, extraClassNames, extraStyles }) => {
    return (
        <section className={`card ${extraClassNames}`} style={{
            display: `${variant === undefined && 'flex'}`,
            flexDirection: `${variant === undefined && 'column'}`,
            gridTemplateColumns: `${variant === 'primary' ? '40% 60%' : '60% 40%'}`,
            ...extraStyles
        }}>
            {children}
        </section>
    )
}

export const CardLayoutCollection = ({ children, onMouseDown, onMouseUp, onTouchStart, onTouchEnd }) => {
    return (
        <section
            className="card-collection justify-content-center"
            onTouchStart={e => onMouseDown()}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
        >
            {children}
        </section>
    )
}

export default CardLayout