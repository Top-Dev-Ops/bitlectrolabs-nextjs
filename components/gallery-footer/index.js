import React, { useState } from 'react'
import { useRouter } from 'next/router'

import { TextButton, SVGButton, ArrowButton } from "../custom/Button"

import { Grid, List, Settings, CircleBadge } from "../custom/svgs"

import GalleryFilter from './gallery-filter'

import useKeyPress from '../../hooks/useKeyPress'

const GalleryFooter = ({
    view,
    attributes,
    changeView,
    onClickLeft,
    onClickRight,
    onMouseDown,
    onMouseUp,
}) => {
    const [activeTab, setActiveTab] = useState('Dreamloops')
    const [modalOpen, setModalOpen] = useState(false)
    const [hoverGridList, setHoverGridList] = useState(false)
    const [hoverSettings, setHoverSettings] = useState(false)

    const router = useRouter()

    const filters = {}
    attributes.forEach(attribute => {
        if (Object.keys(filters).includes(attribute.trait_type)) {
            filters[attribute.trait_type] = [...filters[attribute.trait_type], attribute.value]
        } else {
            filters[attribute.trait_type] = []
        }
    })

    useKeyPress('ArrowLeft', () => onClickRight())
    useKeyPress('ArrowRight', () => onClickLeft())

    return (
        <>
            {modalOpen ?
                <GalleryFilter
                    attributes={filters}
                    onClose={() => {
                        setHoverGridList(false);
                        setHoverSettings(false);
                        setModalOpen(false)
                    }}
                /> :
                <section className="gallery-footer row">
                    {/* TABS & LIST(GRID) BUTTON */}
                    <div
                        className="col-12 col-lg-5 d-inline-flex flex-row align-items-center mb-2 mb-lg-0"
                        style={{zIndex: '3'}}
                    >
                        {/* TABS - DREAMLOOPS, DREAMERS, STRFKR */}
                        <div className="gallery-footer-text-button mr-0 mx-xl-2">
                            {router.pathname === '/my-bitlectro' && <TextButton
                                text='All'
                                extraClassNames={activeTab === 'All' ? 'active' : undefined}
                                onClick={() => setActiveTab('All')}
                            />}
                            <TextButton
                                text='Dreamloops'
                                extraClassNames={activeTab === 'Dreamloops' ? 'active' : undefined}
                                onClick={() => setActiveTab('Dreamloops')}
                            />
                            <TextButton
                                text='Dreamers'
                                extraClassNames={`mx-1 mx-lg-0 ${activeTab === 'Dreamers' ? 'active' : undefined}`}
                                onClick={() => setActiveTab('Dreamers')}
                            />
                            {router.pathname !== '/my-bitlectro' && <TextButton
                                text='STRFKR'
                                extraClassNames={activeTab === 'STRFKR' ? 'active' : undefined}
                                onClick={() => setActiveTab('STRFKR')}
                            />}
                        </div>

                        {/* GRID OR LIST VIEW BUTTON */}
                        {router.pathname !== '/my-bitlectro' && <SVGButton
                            icon={view ? <Grid hover={hoverGridList} /> : <List hover={hoverGridList} />}
                            extraClassNames="d-none d-xl-block"
                            onClick={changeView}
                            onMouseEnter={() => { setHoverGridList(true); setHoverSettings(false) }}
                            onMouseLeave={() => { setHoverGridList(false); setHoverSettings(false)}}
                        />}
                    </div>

                    {/* FILTER BUTTON & ABOUT COLLECTION */}
                    <div
                        className="col-12 col-lg-5 offset-lg-2 d-inline-flex flex-row align-items-center justify-content-between justify-content-sm-start flex-lg-row-reverse"
                        style={{zIndex: '3'}}
                    >
                        <TextButton
                            text={router.pathname !== '/my-bitlectro' ? 'About collection' : 'All purchases'}
                            extraClassNames="mx-1"
                        />

                        <div className="d-inline-flex flex-row-reverse">
                            {router.pathname !== '/my-bitlectro' && (
                                <>
                                    <SVGButton
                                        icon={<Settings hover={hoverSettings} />}
                                        badge={<CircleBadge />}
                                        extraClassNames={'mx-1'}
                                        onClick={() => {
                                            setModalOpen(!modalOpen);
                                            setHoverSettings(false);
                                            setHoverGridList(false)
                                        }}
                                        onMouseEnter={() => {
                                            setHoverSettings(true);
                                            setHoverGridList(false)
                                        }}
                                        onMouseLeave={() => {
                                            setHoverSettings(false);
                                            setHoverGridList(false)
                                        }}
                                    />
                                    <SVGButton
                                        icon={view ? <Grid hover={hoverGridList} /> : <List hover={hoverGridList} />}
                                        extraClassNames="d-block d-xl-none mx-1"
                                        onClick={changeView}
                                        onMouseEnter={() => {
                                            setHoverGridList(true);
                                            setHoverSettings(false)
                                        }}
                                        onMouseLeave={() => {
                                            setHoverGridList(false);
                                            setHoverSettings(false)
                                        }}
                                    />
                                </>
                            )}
                        </div>
                    </div>

                    {/* ARROW BUTTONS AT THE CENTER */}
                    <div
                        className="gallery-footer-arrow w-100 d-inline-flex justify-content-center align-items-end"
                        style={{top: view ? '-50%' : '0'}}
                    >
                        <ArrowButton
                            direction="left"
                            extraClassNames={'mx-1'}
                            onMouseDown={onMouseDown}
                            onMouseUp={onMouseUp}
                            onClick={onClickLeft}
                        />
                        {view && <div className="d-inline-flex flex-column mr-2">
                            <ArrowButton
                                direction="up"
                                extraClassNames={'mx-1 mb-1'}
                                onMouseDown={onMouseDown}
                                onMouseUp={onMouseUp}
                            />
                            <ArrowButton
                                direction="down"
                                extraClassNames={'mx-1 mt-1'}
                                onMouseDown={onMouseDown}
                                onMouseUp={onMouseUp}
                            />
                        </div>}
                        <ArrowButton
                            direction="right"
                            extraClassNames="mx-1"
                            onClick={onClickRight}
                            onMouseDown={onMouseDown}
                            onMouseUp={onMouseUp}
                        />
                    </div>
                </section>
            }
        </>
    )
}

export default GalleryFooter