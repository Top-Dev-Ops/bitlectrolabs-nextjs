import { RadioButton } from "../custom/Button"

export default function GalleryElements({ filters, checkFilters, resetFilters }) {

    const alphabets = Array.from(Array(26)).map((e, i) => String.fromCharCode(i + 65))

    return (
        <>
            {
                alphabets.map(alphabet => (
                    <div
                        key={`col_${alphabet}`}
                        id={`col_${alphabet}`}
                        className="mb-4"
                    >
                        <span>{alphabet}</span>

                        <div className="gallery-filter-content-grid">
                            {filters.map(data => data.startsWith(alphabet) ? (
                                <RadioButton
                                    key={`${alphabet}_${data}`}
                                    text={data}
                                    onChange={checkFilters}
                                    reset={resetFilters}
                                    extraClassNames="mb-2"
                                />
                            ) : undefined)}
                        </div>
                    </div>
                ))
            }
            <div
                id="col_0-9"
                className="mb-5"
            >
                <span>0-9</span>
                <div className="gallery-filter-content-grid">
                    {filters.map(data => /^[0-9].*/i.test(data) ? (
                        <RadioButton
                            key={`${data}`}
                            text={data}
                            onChange={checkFilters}
                            reset={resetFilters}
                            extraClassNames="mb-2"
                        />
                    ) : undefined)}
                </div>
            </div>
        </>
    )
}