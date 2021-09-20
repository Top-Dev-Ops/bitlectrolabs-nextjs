import React, { useState, useEffect } from "react"

export default function Hamburger({ onClick }) {
    const [size, setSize] = useState(true)

    useEffect(() => {
        if (window.innerWidth < 769) {  // mobile
            setSize(false)
        }

        function handleResize() {
            if (window.innerWidth < 769) {
                setSize(false)
            }
        }

        window.addEventListener('resize', handleResize)

        return (() => {
            window.removeEventListener('resize', handleResize)
        })
    }, [])

    return (
        <button className="hamburger bg-transparent border-0 outline-0" onClick={onClick}>
            {size ? <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle cx="4" cy="4" r="4" fill="current"/>
                <circle cx="26" cy="4" r="4" fill="current"/>
                <circle cx="4" cy="26" r="4" fill="current"/>
                <circle cx="26" cy="26" r="4" fill="current"/>
            </svg> :
            <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle cx="3" cy="3" r="3" fill="white"/>
                <circle cx="19" cy="3" r="3" fill="white"/>
                <circle cx="3" cy="19" r="3" fill="white"/>
                <circle cx="19" cy="19" r="3" fill="white"/>
            </svg>}
        </button>
    )
}