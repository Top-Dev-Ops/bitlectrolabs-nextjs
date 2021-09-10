export default function Hamburger() {
    return (
        <button className="hamburger bg-transparent border-0 outline-0">
            <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle cx="4" cy="4" r="4" fill="white"/>
                <circle cx="26" cy="4" r="4" fill="white"/>
                <circle cx="4" cy="26" r="4" fill="white"/>
                <circle cx="26" cy="26" r="4" fill="white"/>
            </svg>
        </button>
    )
}