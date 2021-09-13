import { useState } from "react"
import { TextButton, SVGButton } from "../custom/Button"
import { Close } from "../custom/svgs"

export default function GalleryFilter({ onClose }) {
    const [activeTab, setActiveTab] = useState('Dreamloops')

    return (
        <section className="gallery-filter">
            <div className="d-flex justify-content-between">
                <h2>Filter by</h2>

                <Close
                    extraClassNames="d-block"
                    onClick={onClose}
                />
            </div>

            <div className="gallery-footer-text-button mr-0 mx-xl-2">
                <TextButton
                    text='Dreamloops'
                    extraClassNames={activeTab === 'Dreamloops' ? 'active' : undefined}
                    onClick={() => setActiveTab('Dreamloops')}
                />
                <TextButton
                    text='Dreamers'
                    extraClassNames={activeTab === 'Dreamers' ? 'active' : undefined}
                    onClick={() => setActiveTab('Dreamers')}
                />
                <TextButton
                    text='STRFKR'
                    extraClassNames={activeTab === 'STRFKR' ? 'active' : undefined}
                    onClick={() => setActiveTab('STRFKR')}
                />
            </div>
        </section>
    )
}