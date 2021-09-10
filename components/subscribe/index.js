import Button from '../custom/Button';

const Subscribe = () => {
    return <section className="subscribe-container">
        <h4>Sign up for first access</h4>
        <p>Enter your email address to learn about ongoing Bitlectro releases, features, and events</p>

        <div className="subscribe-button">
            <input type="email" placeholder="Email" />
            <Button text={'Subscribe'} variant={'outline-sm'} />
        </div>
    </section>
}

export default Subscribe