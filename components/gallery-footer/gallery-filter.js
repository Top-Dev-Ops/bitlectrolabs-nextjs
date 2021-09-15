import { useState } from "react"

import { TextButton, RadioButton } from "../custom/Button"
import Search from "../custom/Search"
import { Close } from "../custom/svgs"

import GalleryElements from "./gallery-elements"

export default function GalleryFilter({ onClose }) {
    const [activeTab, setActiveTab] = useState('Elements')
    const [filters, setFilters] = useState([])
    const [resetFilters, setResetFilters] = useState(false)

    const items = ['Elements', 'Background', 'Music', 'Scarcity', 'Redeemable', 'Count']
    
    const alphabets = Array.from(Array(26)).map((e, i) => String.fromCharCode(i + 65))

    /* RESETS FILTERS EMPTY */
    const reset = () => {
        setFilters([])
        setResetFilters(!resetFilters)
    }

    /* APPLIES FILTERS */
    const apply = () => {
        console.log('FILTERS: ', filters)
    }

    /* ADDS OR REMOVES FILTERS WHEN CHECKING RADIOS */
    const checkFilters = (checked, filter) => {
        if (checked) {
            setFilters([...filters, filter])
        } else {
            const temp = [...filters]
            temp.splice(temp.indexOf(filter), 1)
            setFilters(temp)
        }
    }

    /* REMOVES FILTERS WHEN CLICKING ON ×(CROSS) */
    const removeFilters = (index) => {
        const temp = [...filters]
        temp.splice(index, 1)
        setFilters(temp)
    }

    return (
        <section className={`gallery-filter ${(activeTab === 'Redeemable' || activeTab === 'Count') && 'justify-content-start'}`}>
            <div className="w-100 row gx-0 flex-row-reverse">
                <div className="gallery-filter-header">
                    <h2 className="d-block d-lg-none">Filter by</h2>
                    <h2
                        className="d-none d-lg-block"
                        style={{visibility: `${filters.length === 0 ? 'visible' : 'hidden'}`}}
                    >
                        Filter by
                    </h2>

                    <div className="gallery-filter-text-button mr-0 mx-xl-2 my-2">
                        {items.map(item => (
                            <TextButton
                                key={item}
                                text={item}
                                extraClassNames={`${activeTab === item ? 'active' : undefined} my-1 my-lg-0 mx-2 mx-lg-0 px-3`}
                                onClick={() => setActiveTab(item)}
                            />
                        ))}
                    </div>

                    <Search extraStyles={{paddingRight: '50px'}} />
                </div>
            </div>

            <div className="gallery-filter-content">
                {activeTab === 'Elements' && <GalleryElements checkFilters={checkFilters} resetFilters={resetFilters} />}
                {activeTab === 'Redeemable' && (
                    <div className="gallery-filter-content-grid">
                        <RadioButton text={'Redeemable'} onChange={checkFilters} reset={resetFilters} />
                        <RadioButton text={'Not redeemable'} onChange={checkFilters} reset={resetFilters} />
                    </div>
                )}
                {activeTab === 'Count' && (
                    <div className="gallery-filter-content-grid">
                        {Array.from(Array(7)).map((e, i) => (
                            <RadioButton key={`count_${i}`} text={`${i+1}`} onChange={checkFilters} reset={resetFilters} />
                        ))}
                    </div>
                )}
            </div>
            
            {filters.length > 0 && (
                <>
                    <div className="gallery-filter-search">
                        <div>
                            <h2>Filter by</h2>

                            {filters.map((filter, index) => (
                                <div key={`${filter}_${index}`} className="search-box">
                                    {filter}
                                    <span onClick={() => removeFilters(index)}>×</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="gallery-filter-search-buttons">
                        <button onClick={reset}>Reset all</button>
                        <button onClick={apply}>Apply</button>
                    </div>
                </>
            )}

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
            </div>

            <Close
                extraClassNames="d-block"
                onClick={onClose}
                extraStyles={{position: 'absolute', top: '30px', right: '30px', width: '30px', height: '30px'}}
            />
        </section>
    )
}