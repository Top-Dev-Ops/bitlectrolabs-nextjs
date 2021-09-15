import { RadioButton } from "../custom/Button"

export default function GalleryElements({ checkFilters, resetFilters }) {

    const alphabets = Array.from(Array(26)).map((e, i) => String.fromCharCode(i + 65))
    const data = ['Artemisia Bust', 'Column Top', 'Small Desklamp', 'ColumnTop']

    return (
        <>
            {
                alphabets.map(alphabet => (
                    <div
                        key={`col_${alphabet}`}
                        id={`col_${alphabet}`}
                        className={`my-3 ${alphabet === 'Z' && 'mb-5 pb-5'}`}
                    >
                        <span>{alphabet}</span>

                        <div className="gallery-filter-content-grid">
                            {data.map(datum => (
                                <RadioButton
                                    key={`${alphabet}_${datum}`}
                                    text={datum}
                                    onChange={checkFilters}
                                    reset={resetFilters}
                                />
                            ))}
                        </div>
                    </div>
                ))
            }
        </>
    )
}