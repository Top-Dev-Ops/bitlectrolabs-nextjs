import React, { useState } from 'react'

const SoundSwitch = ({  }) => {
    const [state, setState] = useState(false)

    return (
        <div
            className="d-inline-flex"
            onClick={() => setState(!state)}
        >
            {state ? (
                <svg
                    width="19"
                    height="20"
                    viewBox="0 0 19 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect y="10" width="4" height="10" fill="white"/>
                    <rect x="5" y="5" width="4" height="15" fill="white"/>
                    <rect x="10" y="7" width="4" height="13" fill="white"/>
                    <rect x="15" width="4" height="20" fill="white"/>
                </svg>
            ) : (
                <svg
                    width="19"
                    height="20"
                    viewBox="0 0 19 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect y="4" width="4" height="16" fill="#7C808A"/>
                    <rect x="5" y="4" width="4" height="16" fill="#7C808A"/>
                    <rect x="10" y="4" width="4" height="16" fill="#7C808A"/>
                    <rect x="15" y="4" width="4" height="16" fill="#7C808A"/>
                </svg>
            )}
            
            <span className="mx-2" style={{fontSize: 'var(--subHeadingSm)'}}>
                {state ? 'Sound On' : 'Sound Off'}
            </span>
            <style jsx>{`
                div:hover {
                    cursor: url('/pointer1.svg') 0 0, pointer;
                }
                span {
                    color: ${state ? 'var(--pureWhite)' : 'var(--midGray400)'}
                }
            `}</style>
        </div>
    )
}

export default SoundSwitch