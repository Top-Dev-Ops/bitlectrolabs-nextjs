import { useState } from "react"
import { CloseFilter } from "../custom/svgs/Close"

export default function MyPurchases({
    tokens,
}) {

    const [activeTab, setActiveTab] = useState('Dreamloops')

    return (
        <section className="my-purchases">
            <div className="my-purchases-collection">
                <p
                    className={`my-purchases-collection-paragraph ${activeTab === 'Dreamloops' ? 'active' : ''}`}
                    onClick={() => setActiveTab('Dreamloops')}
                >
                    Dreamloops
                </p>
                <p
                    className={`my-purchases-collection-paragraph ${activeTab === 'Dreamers' ? 'active' : ''}`}
                    onClick={() => setActiveTab('Dreamers')}
                >
                    Dreamers
                </p>
                <p
                    className={`my-purchases-collection-paragraph ${activeTab === 'STRFKR' ? 'active' : ''}`}
                    onClick={() => setActiveTab('STRFKR')}
                >
                    STRFKR
                </p>
            </div>

            <CloseFilter
                onClick={() => console.log("CLOSE")}
                extraStyles={{
                    position: 'absolute',
                    top: '30px',
                    right: '30px',
                    width: '30px',
                    height: '30px'
                }}
            />

            
        </section>
    )
}