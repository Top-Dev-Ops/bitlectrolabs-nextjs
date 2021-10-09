import { ArrowButton } from "../components/custom/Button"

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

export const CardLayoutCollection = ({
    children,
    onMouseDown,
    onMouseUp,
    onTouchStart,
    onTouchEnd,
    onClickLeft,
    onClickRight,
}) => {
    return (
        <section
            className="card-collection justify-content-center"
            onTouchStart={e => onMouseDown()}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
        >
            <div
                className="d-none d-lg-block"
                style={{
                    position: 'absolute',
                    right: '5%',
                    top: '5%',
                    zIndex: '10'
                }}
            >
                <ArrowButton
                    direction="left"
                    extraClassNames="mx-0 mx-lg-2"
                    onClick={onClickLeft}
                />
                <ArrowButton
                    direction="right"
                    onClick={onClickRight}
                />
            </div>

            {children}
        </section>
    )
}

export default CardLayout