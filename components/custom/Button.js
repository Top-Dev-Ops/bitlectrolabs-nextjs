const Button = ({ icon, text, variant }) => {
    const style = variant === 'primary' ? 'custom-button-primary' : 'custom-button-secondary';

    return <button className={`btn btn-sm ${style}`}>
        {icon}
        <span>{text}</span>
    </button>
}

export default Button