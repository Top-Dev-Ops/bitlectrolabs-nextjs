import react, { useState } from "react"

import { TextButton } from "../custom/Button"
import Search from "../custom/Search"
import { CloseFilter } from "../custom/svgs/Close"

import GalleryElements from "./gallery-elements"

export default function GalleryFilter({ attributes, onClose, filters, applyFilter }) {
    const [activeTab, setActiveTab] = useState(Object.keys(attributes).length > 0 ? Object.keys(attributes)[0] : '')
    const [resetFilters, setResetFilters] = useState(false)
    const [selectedFilters, setSelectedFilters] = useState(filters)

    const headers = Object.keys(attributes)
    
    const alphabets = Array.from(Array(26)).map((e, i) => String.fromCharCode(i + 65))

    /* RESETS FILTERS EMPTY */
    const reset = () => {
        applyFilter([])
        setResetFilters(!resetFilters)
    }

    /* ADDS OR REMOVES FILTERS WHEN CHECKING RADIOS */
    const checkFilters = (checked, filter) => {
        if (checked) {
            setSelectedFilters([...selectedFilters, filter])
        } else {
            const temp = [...selectedFilters]
            temp.splice(temp.indexOf(filter), 1)
            setSelectedFilters(temp)
        }
    }

    /* REMOVES FILTERS WHEN CLICKING ON ×(CROSS) */
    const removeFilters = (index) => {
        const temp = [...selectedFilters]
        temp.splice(index, 1)
        setSelectedFilters(temp)
    }

    return (
        <section
            className={`
                gallery-filter
                ${['percussion', 'song_title', 'scarcity', 'element_count', 'redeemable'].includes(activeTab) && 'justify-content-start'}
            `}
        >
            {/* FILTER HEADERS */}
            <div className="w-100 row gx-0 flex-row-reverse">
                <div className="gallery-filter-header">
                    <h2 className="d-block d-lg-none">Filter by</h2>
                    <h2
                        className="d-none d-lg-block"
                        style={{visibility: `${filters.length === 0 ? 'visible' : 'hidden'}`}}
                    >
                        Filter by
                    </h2>

                    <div
                        className="gallery-filter-text-button mr-0 mx-xl-2 my-2"
                        style={{padding: '4px', background: 'var(--midGray700)'}}
                    >
                        {headers.map(header => (
                            <TextButton
                                key={header}
                                text={header.includes('count') ? 'count' : header.includes('_') ? header.split('_')[0] : header}
                                extraClassNames={`${activeTab === header ? 'active' : undefined} my-1 my-lg-0 mx-2 mx-lg-0 px-3`}
                                extraStyles={{background: `${activeTab === header ? 'var(--pureWhite)' : 'var(--midGray700)'}`}}
                                onClick={() => setActiveTab(header)}
                            />
                        ))}
                    </div>

                    <Search extraStyles={{paddingRight: '50px'}} />
                </div>
            </div>

            <div className="gallery-filter-content">
                <GalleryElements
                    header={activeTab}
                    filters={attributes[activeTab]}
                    selectedFilters={selectedFilters}
                    checkFilters={checkFilters}
                    resetFilters={resetFilters}
                />
            </div>

            {/* SELECTED FILTERS AT LEFT HANDSIDE */}
            {selectedFilters.length > 0 && (
                <>
                    <div className="gallery-filter-search">
                        <div>
                            <h2>Filter by</h2>

                            {selectedFilters.map((filter, index) => (
                                <div
                                    key={`${filter}_${index}`}
                                    className="search-box"
                                >
                                    {filter}
                                    <span onClick={() => removeFilters(index)}>
                                        ×
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="gallery-filter-search-buttons">
                        <button onClick={() => {
                            reset()
                            onClose()
                        }}>Reset all</button>
                        <button onClick={() => {
                            applyFilter(selectedFilters)
                            onClose()
                        }}>Apply</button>
                    </div>
                </>
            )}

            {/* SCROLLBAR A-Z AT THE VERY RIGHT HANDSIDE */}
            <div className="gallery-filter-scrollbar">
                {alphabets.map(alphabet => (
                    <a
                        className="text-white"
                        href={`#col_${alphabet}`}
                        key={`search_${alphabet}`}
                    >
                        {alphabet}
                    </a>
                ))}
                <a
                    className="text-white"
                    href={`#col_0-9`}
                    key={`search_0-9`}
                >0-9</a>
            </div>

            {/* CLOSE BUTTON */}
            <CloseFilter
                extraClassNames="d-block"
                onClick={onClose}
                extraStyles={{position: 'absolute', top: '30px', right: '30px', width: '30px', height: '30px'}}
            />
        </section>
    )
}