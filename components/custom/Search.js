import Divider from './Divider'

export default function Search({ onChange, extraClassNames, extraStyles }) {
    return (
        <section
            className={`mx-0 mx-lg-2 my-4 ${extraClassNames}`}
            style={extraStyles}
        >
            <input
                placeholder="Search"
                onChange={onChange}
            />

            <Divider />

            <style jsx>{`
                input {
                    border: none;
                    outline: none;
                    background: transparent;
                    font-size: var(--subHeadingLg);
                    caret-color: var(--pureWhite);
                    color: var(--pureWhite);
                }

                input:focus, input:focus-visible {
                    border: none;
                    outline: none;
                }
            `}</style>
        </section>
    )
}