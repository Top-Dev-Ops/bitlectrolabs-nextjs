import { RadioButton } from "../custom/Button"

export default function GalleryElements({
    header,
    filters,
    selectedFilters,
    checkFilters,
    resetFilters
}) {

    const alphabets = Array.from(Array(26)).map((e, i) => String.fromCharCode(i + 65))

    const sortedFilters = filters.sort((a, b) => {
        if (a > b) return 1
        if (a < b) return -1
        return 0
    })

    return (
        <>
            {(header === 'percussion' || header === 'song_title' || header === 'scarcity' || header === 'element_count' || header === 'redeemable') ? (
                <div className="gallery-filter-content-grid">
                    {sortedFilters.map(data => (
                        <RadioButton
                            key={`gallery_filter_${header}_${data}`}
                            text={data}
                            onChange={checkFilters}
                            reset={resetFilters}
                            extraClassNames="mb-2"
                            checked={selectedFilters.includes(data) ? true : false}
                        />
                    ))}
                </div>
            ) : (
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
                                    {sortedFilters.map(data => data.startsWith(alphabet) ? (
                                        <RadioButton
                                            key={`${alphabet}_${data}`}
                                            text={data}
                                            onChange={checkFilters}
                                            reset={resetFilters}
                                            extraClassNames="mb-2"
                                            checked={selectedFilters.includes(data) ? true : false}
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
                            {sortedFilters.map(data => /^[0-9].*/i.test(data) ? (
                                <RadioButton
                                    key={`${data}`}
                                    text={data}
                                    onChange={checkFilters}
                                    reset={resetFilters}
                                    extraClassNames="mb-2"
                                    checked={selectedFilters.includes(data) ? true : false}
                                />
                            ) : undefined)}
                        </div>
                    </div>
                </>
            )}
        </>
    )
}