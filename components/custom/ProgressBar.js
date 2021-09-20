export default function ProgressBar({
    percentage,
    extraClassNames,
    extraStyles,
}) {
    return (
        <div
            className={`progressbar-container ${extraClassNames}`}
            style={extraStyles}
        >
            <div className="progressbar">
                <div className="filled" />
            </div>

            <style jsx>{`
                .progressbar-container {
                    height: 6px;
                    width: 100%;
                    padding: 0 60px;
                }
                .progressbar {
                    height: 100%;
                    border-radius: 3px;
                    background: var(--midGray700);
                }
                .filled {
                    height: 100%;
                    width: ${percentage}%;
                    background: var(--purpleGradient1);
                    border-radius: 3px;
                }
            `}</style>
        </div>
    )
}