const VolumeControl = ({
    volume,
    setVolume,
}) => {
    return (
        <>
            <input
                type="range"
                min={0}
                max={100}
                defaultValue={volume}
                onChange={(e) => setVolume(e.target.value)}
            />

            <style jsx>{`
                input {
                    -webkit-appearance: none;
                    width: 100px;
                    height: 2px;
                    background: var(--midGray600);
                }
                input:hover {
                    cursor: url('/pointer1.svg') 0 0, pointer;
                }
                input[type=range]::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    width: 13px;
                    height: 13px;
                    background: var(--midGray600);
                    border-radius: 4px;
                }
                input[type=range]::-moz-range-thumb {
                    width: 13px;
                    height: 13px;
                    background: var(--midGray600);
                }
                input[type=range]::-ms-thumb {
                    width: 13px;
                    height: 13px;
                    background: var(--midGray600);
                }
            `}</style>
        </>
    )
}

export default VolumeControl