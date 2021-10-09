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
    filters,
    applyFilter,
    onClickPurchases,
}) => {
    const [activeTab, setActiveTab] = useState('Dreamloops')
    const [modalOpen, setModalOpen] = useState(false)
    const [hoverGridList, setHoverGridList] = useState(false)
    const [hoverSettings, setHoverSettings] = useState(false)
    const [left, setLeft] = useState(false)
    const [right, setRight] = useState(false)
    const [up, setUp] = useState(false)
    const [down, setDown] = useState(false)

    const router = useRouter()

    const filterOptions = {}
    attributes.forEach(attribute => {
        if (Object.keys(filterOptions).includes(attribute.trait_type)) {
            filterOptions[attribute.trait_type] = [...filterOptions[attribute.trait_type], attribute.value]
        } else {
            filterOptions[attribute.trait_type] = []
        }
    })

    useKeyPress('ArrowLeft', () => {setLeft(false); onClickLeft()}, () => { setLeft(true)})
    useKeyPress('ArrowRight', () => {setRight(false); onClickRight()}, () => { setRight(true) })
    useKeyPress('ArrowUp', () => { setUp(false) }, () => { setUp(true) })
    useKeyPress('ArrowDown', () => { setDown(false) }, () => { setDown(true) })    

    return (
        <>
            {modalOpen ?
                <GalleryFilter
                    attributes={filterOptions}
                    onClose={() => {
                        setHoverGridList(false);
                        setHoverSettings(false);
                        setModalOpen(false)
                    }}
                    filters={filters}
                    applyFilter={applyFilter}
                /> :
                <section className="gallery-footer row">
                    {/* TABS & LIST(GRID) BUTTON */}
                    <div
                        className="col-12 col-lg-5 d-inline-flex flex-row align-items-center mb-2 mb-lg-0"
                        style={{zIndex: '3'}}
                    >
                        {/* GRID OR LIST VIEW BUTTON */}
                        {router.pathname !== '/my-bitlectro' && (
                            <SVGButton
                                icon={view ? <List hover={hoverGridList} /> : <Grid hover={hoverGridList} />}
                                extraClassNames="d-none d-xl-block"
                                onClick={changeView}
                                onMouseEnter={() => { setHoverGridList(true); setHoverSettings(false) }}
                                onMouseLeave={() => { setHoverGridList(false); setHoverSettings(false)}}
                            />
                        )}
                    </div>

                    {/* FILTER BUTTON & ABOUT COLLECTION */}
                    <div
                        className="col-12 col-lg-5 offset-lg-2 d-inline-flex flex-row align-items-center justify-content-between justify-content-sm-start flex-lg-row-reverse"
                        style={{zIndex: '3'}}
                    >
                        {router.pathname !== '/my-bitlectro' && (
                            <TextButton
                                text="About collection"
                                extraClassNames="mx-1"
                                onClick={() => {
                                    if (router.pathname === '/my-bitlectro') {
                                        onClickPurchases()
                                    } else {
                                        router.push(`/collections/${activeTab}`)
                                    }
                                }}
                            />
                        )}

                        <div className="d-inline-flex flex-row-reverse">
                            {router.pathname !== '/my-bitlectro' && (
                                <>
                                    <SVGButton
                                        icon={<Settings hover={hoverSettings} />}
                                        badge={filters.length > 0 && <CircleBadge />}
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
                                        icon={view ? <List hover={hoverGridList} /> : <Grid hover={hoverGridList} />}
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
                        style={{
                            top: view ? '-50%' : '0',
                            bottom: router.pathname === '/my-bitlectro' ? '32px' : undefined,
                        }}
                    >
                        <ArrowButton
                            direction="left"
                            extraClassNames={'mx-1'}
                            extraStyles={
                                left === true ? {background: 'var(--midGray600)'} : undefined
                            }
                            onMouseDown={onMouseDown}
                            onMouseUp={onMouseUp}
                            onClick={onClickLeft}
                        />
                        {view && <div className="d-inline-flex flex-column mr-2">
                            <ArrowButton
                                direction="up"
                                extraClassNames={'mx-1 mb-1'}
                                extraStyles={
                                    up === true ? {background: 'var(--midGray600)'} : undefined
                                }
                                onMouseDown={onMouseDown}
                                onMouseUp={onMouseUp}
                            />
                            <ArrowButton
                                direction="down"
                                extraClassNames={'mx-1 mt-1'}
                                extraStyles={
                                    down === true ? {background: 'var(--midGray600)'} : undefined
                                }
                                onMouseDown={onMouseDown}
                                onMouseUp={onMouseUp}
                            />
                        </div>}
                        <ArrowButton
                            direction="right"
                            extraClassNames="mx-1"
                            extraStyles={
                                right === true ? {background: 'var(--midGray600)'} : undefined
                            }
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