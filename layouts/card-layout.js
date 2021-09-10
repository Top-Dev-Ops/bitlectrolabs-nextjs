const CardLayout = ({ variant, children }) => {
    return (
        <section className="card" style={{
            gridTemplateColumns: `${variant === 'primary' ? '40% 60%' : '60% 40%'}`
        }}>
            {children}
        </section>
    )
}

export default CardLayout