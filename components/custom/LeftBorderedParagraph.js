export default function LeftBorderedParagraph({ extraClassNames, extraStyles, children}) {
    return (
        <div
            className={`left-bordered-paragraph ${extraClassNames}`}
            style={extraStyles}
        >
            {children}

            <style jsx>{`
                .left-bordered-paragraph {
                    width: 100%;
                    font-size: 58px;
                    padding-left: 40px;
                    border-left: 4px solid;
                    border-image: linear-gradient(to bottom, #6309D7, #B788F3) 1 100%;
                    line-height: 100%;
                }
                @media (max-width: 992px) {
                    .left-bordered-paragraph {
                        font-size: 32px;
                        padding-left: 20px;
                    }
                }
            `}</style>
        </div>
    )
}