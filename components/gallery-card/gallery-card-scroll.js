import { useState } from 'react'
import { useRouter } from 'next/router'

export default function GalleryCardScroll({ onClick, extraClassNames, extraStyles }) {

    const router = useRouter()

    const [scroll, setScroll] = useState(false)

    const handleClick = () => {
        onClick(!scroll)
        setScroll(!scroll)
    }

    return (
        <>
            {router.route !== '/buy' && <button
                className={`bg-transparent border-0 outline-0 px-0 position-absolute ${extraClassNames}`}
                onClick={handleClick}
                style={{width: '10px', top: '30px', right: '10px', ...extraStyles}}
            >
                <svg
                    width="10"
                    height="62"
                    viewBox="0 0 10 62"
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon"
                >
                    <rect width="10" height="62" rx="5" className="path1" fill="#4A4C52" />
                    <rect x="1" y="1" width="8" height="30" rx="4" fill="#2B2C30" className={scroll ? 'd-none' : undefined} />
                    <rect x="1" y="31" width="8" height="30" rx="4" fill="#2B2C30" className={!scroll ? 'd-none' : undefined} />
                </svg>
            </button>}
        </>
    )
}