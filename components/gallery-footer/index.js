import React, { useState } from 'react'

import { TextButton, SVGButton, ArrowButton } from "../custom/Button"

import { Grid, List, Settings, CircleBadge } from "../custom/svgs"

import GalleryFilter from './gallery-filter'

const GalleryFooter = ({
    view,
    changeView,
    onClickLeft,
    onClickRight,
    onClickUp,
    onClickDown,
}) => {
    const [activeTab, setActiveTab] = useState('Dreamloops')
    const [modalOpen, setModalOpen] = useState(false)
    const [hoverGridList, setHoverGridList] = useState(false)
    const [hoverSettings, setHoverSettings] = useState(false)

    return (
        <>
            {modalOpen ?
                <GalleryFilter
                    onClose={() => { setHoverGridList(false); setHoverSettings(false); setModalOpen(false) }}
                /> :
                <section className="gallery-footer row">
                    <div className="col-12 col-lg-5 d-inline-flex flex-row mb-2 mb-lg-0" style={{zIndex: '3'}}>
                        <div className="gallery-footer-text-button mr-0 mx-xl-2">
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
                            <TextButton
                                text='STRFKR'
                                extraClassNames={activeTab === 'STRFKR' ? 'active' : undefined}
                                onClick={() => setActiveTab('STRFKR')}
                            />
                        </div>
                        <SVGButton
                            icon={view ? <Grid hover={hoverGridList} /> : <List hover={hoverGridList} />}
                            extraClassNames="d-none d-xl-block"
                            onClick={changeView}
                            onMouseEnter={() => { setHoverGridList(true); setHoverSettings(false) }}
                            onMouseLeave={() => { setHoverGridList(false); setHoverSettings(false)}}
                        />
                    </div>

                    <div className="col-12 col-lg-5 offset-lg-2 d-inline-flex flex-row justify-content-between justify-content-sm-start flex-lg-row-reverse" style={{zIndex: '3'}}>
                        <TextButton text={'About collection'} extraClassNames="mx-1" />
                        <div className="d-inline-flex flex-row-reverse">
                            <SVGButton
                                icon={<Settings hover={hoverSettings} />}
                                badge={<CircleBadge />}
                                extraClassNames={'mx-1'}
                                onClick={() => { setModalOpen(!modalOpen); setHoverSettings(false); setHoverGridList(false) }}
                                onMouseEnter={() => { setHoverSettings(true); setHoverGridList(false)}}
                                onMouseLeave={() => { setHoverSettings(false); setHoverGridList(false)}}
                            />
                            <SVGButton
                                icon={view ? <Grid hover={hoverGridList} /> : <List hover={hoverGridList} />}
                                extraClassNames="d-block d-xl-none mx-1"
                                onClick={changeView}
                                onMouseEnter={() => { setHoverGridList(true); setHoverSettings(false) }}
                                onMouseLeave={() => { setHoverGridList(false); setHoverSettings(false) }}
                            />
                        </div>
                    </div>

                    <div
                        className="gallery-footer-arrow w-100 d-inline-flex justify-content-center align-items-end"
                        style={{top: view ? '-50%' : '0'}}
                    >
                        <ArrowButton direction="left" extraClassNames={'mx-1'} onClick={onClickLeft} />
                        {view && <div className="d-inline-flex flex-column mr-2">
                            <ArrowButton direction="up" extraClassNames={'mx-1 mb-1'} onClick={onClickUp} />
                            <ArrowButton direction="down" extraClassNames={'mx-1 mt-1'} onClick={onClickDown} />
                        </div>}
                        <ArrowButton direction="right" extraClassNames="mx-1" onClick={onClickRight} />
                    </div>
                </section>
            }
        </>
    )
}

export default GalleryFooter