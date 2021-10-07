import { useEffect } from "react";

export default function GallerySkeleton() {

    useEffect(() => {
        const timer = () => {
            console.log("hello")
        }

        setInterval(timer, 100)
        return () => clearInterval(timer)
    }, [])

    return (
        <svg
            width="360"
            height="360"
            viewBox="0 0 360 360"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect width="360" height="360" rx="16" fill="#212226"/>
            
            <rect width="158" height="360" fill="url(#paint0_linear)"/>
            <defs>
                <linearGradient id="paint0_linear" x1="2.25423e-06" y1="170.438" x2="158" y2="170.438" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#212226"/>
                    <stop offset="0.505208" stop-color="#2D2E33"/>
                    <stop offset="1" stop-color="#212226"/>
                </linearGradient>
            </defs>
        </svg>
    )
}
