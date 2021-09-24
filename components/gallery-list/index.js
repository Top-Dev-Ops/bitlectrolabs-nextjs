import React, { useState, useEffect } from 'react'

export default function GalleryList({ extraClassNames, left, right, tokenSelect, tokens }) {

    const [LgTokens, setLgTokens] = useState([])
    const [MdTokens, setMdTokens] = useState([])
    const [SmTokens, setSmTokens] = useState([])
    const [start, setStart] = useState(0)
    const [hover, setHover] = useState('')

    const onMouseDown = e => {
        e.preventDefault()
        setStart(e.clientX)
    }

    const onMouseUp = e => {
        e.preventDefault()
        if (Math.abs(start - e.clientX) > 150 && start > e.clientX) {           // slide to right
            slideLeft()
        } else if (Math.abs(start - e.clientX) > 150 && start < e.clientX) {    // slide to left
            slideRight()
        }
    }

    useEffect(() => {
        if (tokens.length > 0) {
            if (tokens.length > 6) {
                setLgTokens(tokens.slice(1, 6))
                setMdTokens(tokens.slice(1, 6))
                setSmTokens(tokens.slice(1, 4))
            } else if(tokens.length > 4) {
                setLgTokens(tokens.concat([...Array(7 - tokens.length).keys()].map(index => tokens[index % tokens.length])))
                setMdTokens(tokens.concat([...Array(7 - tokens.length).keys()].map(index => tokens[index % tokens.length])))
                setSmTokens(tokens.slice(1, 4))
            } else {
                setLgTokens(tokens.concat([...Array(7 - tokens.length).keys()].map(index => tokens[index % tokens.length])))
                setMdTokens(tokens.concat([...Array(7 - tokens.length).keys()].map(index => tokens[index % tokens.length])))
                setSmTokens(tokens.concat([...Array(4 - tokens.length).keys()].map(index => tokens[index % tokens.length])))
            }
        }
    }, [tokens])

    useEffect(() => slideLeft, [left])
    useEffect(() => slideRight, [right])

    const slideLeft = () => {
        const [first, ...rest] = LgTokens
        const temp = [...rest, first]
        setLgTokens(temp)
        setMdTokens(temp.slice(1, 6))
        setSmTokens(temp.slice(1, 4))
    }

    const slideRight = () => {
        const last = LgTokens.slice(-1)
        const rest = LgTokens.slice(0, -1)
        const temp = [last, ...rest]
        setLgTokens(temp)
        setMdTokens(temp.slice(1, 6))
        setSmTokens(temp.slice(1, 4))
    }

    return (
        <>
            {LgTokens.length === 0 ?
            <></> :
            <>
                <div
                    className={`w-100 d-none d-lg-flex justify-content-between position-relative ${extraClassNames}`}
                    onMouseDown={onMouseDown}
                    onMouseUp={onMouseUp}
                    onTouchStart={onMouseDown}
                    onTouchEnd={onMouseUp}
                >
                    <div style={{position: 'relative', width: '5.5%', margin: '0 .25% 0 10px', height: '70%', borderRadius: '16px', border: '4px solid rgb(255 255 255 / 40%)', }}>
                        <img
                            src={LgTokens[0].image_original_url}
                            className="galleryImage"
                            onMouseEnter={() => setHover('Lg0')}
                            onMouseLeave={() => setHover('')}
                            style={{opacity: '.4'}}
                            onClick={() => tokenSelect(LgTokens[0])}
                        />
                        {hover === 'Lg0' && <marquee className="marquee" onMouseEnter={() => setHover('Lg0')}>
                            <span className="mx-1">
                                {LgTokens[0].token_id}
                            </span>
                            <span className="mx-1">
                                {LgTokens[0].owner.user !== null && LgTokens[0].owner.user.username}
                            </span>
                        </marquee>}
                    </div>
                    <div style={{position: 'relative', width: '11.5%', margin: '0 .25%', height: '80%', borderRadius: '16px', border: '4px solid rgb(255 255 255 / 60%)'}}>
                        <img
                            src={LgTokens[1].image_original_url}
                            className="galleryImage"
                            onMouseEnter={() => setHover('Lg1')}
                            onMouseLeave={() => setHover('')}
                            style={{opacity: '.6'}}
                            onClick={() => tokenSelect(LgTokens[1])}
                        />
                        {hover === 'Lg1' && <marquee className="marquee" onMouseEnter={() => setHover('Lg1')}>
                            <span className="mx-3">
                                {LgTokens[1].token_id}
                            </span>
                            <span className="mx-3">
                                {LgTokens[1].owner.user !== null && LgTokens[1].owner.user.username}
                            </span>
                        </marquee>}
                    </div>
                    <div style={{position: 'relative', width: '17.5%', margin: '0 .25%', height: '90%', borderRadius: '16px', border: '4px solid rgb(255 255 255 / 80%)'}}>
                        <img
                            src={LgTokens[2].image_original_url}
                            className="galleryImage"
                            onMouseEnter={() => setHover('Lg2')}
                            onMouseLeave={() => setHover('')}
                            style={{opacity: '.8'}}
                            onClick={() => tokenSelect(LgTokens[2])}
                        />
                        {hover === 'Lg2' && <marquee className="marquee" onMouseEnter={() => setHover('Lg2')}>
                            <span className="mx-4">
                                {LgTokens[2].token_id}
                            </span>
                            <span className="mx-4">
                                    {LgTokens[2].owner.user !== null && LgTokens[2].owner.user.username}
                                </span>
                        </marquee>}
                    </div>
                    <div style={{position: 'relative', width: '27.5%', margin: '0 .25%', height: '100%', borderRadius: '16px', border: '4px solid var(--pureWhite)'}}>
                        <img
                            src={LgTokens[3].image_original_url}
                            className="galleryImage"
                            onMouseEnter={() => setHover('Lg3')}
                            onMouseLeave={() => setHover('')}
                            onClick={() => tokenSelect(LgTokens[3])}
                        />
                        {hover === 'Lg3' && <marquee className="marquee" onMouseEnter={() => setHover('Lg3')}>
                            <span className="mx-5">
                                {LgTokens[3].token_id}
                            </span>
                            <span className="mx-5">
                                {LgTokens[3].owner.user !== null && LgTokens[3].owner.user.username}
                            </span>
                        </marquee>}
                    </div>
                    <div style={{position: 'relative', width: '17.5%', margin: '0 .25%', height: '90%', borderRadius: '16px', border: '4px solid rgb(255 255 255 / 80%)'}}>
                        <img
                            src={LgTokens[4].image_original_url}
                            className="galleryImage"
                            onMouseEnter={() => setHover('Lg4')}
                            onMouseLeave={() => setHover('')}
                            style={{opacity: '.8'}}
                            onClick={() => tokenSelect(LgTokens[4])}
                        />
                        {hover === 'Lg4' && <marquee className="marquee" onMouseEnter={() => setHover('Lg4')}>
                            <span className="mx-4">
                                {LgTokens[4].token_id}
                            </span>
                            <span className="mx-4">
                                    {LgTokens[4].owner.user !== null && LgTokens[4].owner.user.username}
                                </span>
                        </marquee>}
                    </div>
                    <div style={{position: 'relative', width: '11.5%', margin: '0 .25%', height: '80%', borderRadius: '16px', border: '4px solid rgb(255 255 255 / 60%)'}}>
                        <img
                            src={LgTokens[5].image_original_url}
                            className="galleryImage"
                            onMouseEnter={() => setHover('Lg5')}
                            onMouseLeave={() => setHover('')}
                            style={{opacity: '.6'}}
                            onClick={() => tokenSelect(LgTokens[5])}
                        />
                        {hover === 'Lg5' && <marquee className="marquee" onMouseEnter={() => setHover('Lg5')}>
                            <span className="mx-3">
                                {LgTokens[5].token_id}
                            </span>
                            <span className="mx-3">
                                    {LgTokens[5].owner.user !== null && LgTokens[5].owner.user.username}
                                </span>
                        </marquee>}
                    </div>
                    <div style={{position: 'relative', width: '5.5%', margin: '0 10px 0 .25%', height: '70%', borderRadius: '16px', border: '4px solid rgb(255 255 255 / 40%)'}}>
                        <img
                            src={LgTokens[6].image_original_url}
                            className="galleryImage"
                            onMouseEnter={() => setHover('Lg6')}
                            onMouseLeave={() => setHover('')}
                            style={{opacity: '.4'}}
                            onClick={() => tokenSelect(LgTokens[6])}
                        />
                        {hover === 'Lg6' && <marquee className="marquee" onMouseEnter={() => setHover('Lg6')}>
                            <span className="mx-1">
                                {LgTokens[6].token_id}
                            </span>
                            <span className="mx-1">
                                {LgTokens[6].owner.user !== null && LgTokens[6].owner.user.username}
                            </span>
                        </marquee>}
                    </div>
                </div>
                
                <div
                    className={`w-100 d-none d-md-flex d-lg-none justify-content-between position-relative ${extraClassNames}`}
                    onMouseDown={onMouseDown}
                    onMouseUp={onMouseUp}
                    onTouchStart={onMouseDown}
                    onTouchEnd={onMouseUp}
                >
                    <div style={{position: 'relative', width: '9.5%', margin: '0 .25%', height: '110%', borderRadius: '16px', border: '4px solid rgb(255 255 255 / 40%)', borderTopLeftRadius: '0', borderBottomLeftRadius: '0', borderLeft: '0'}}>
                        <img
                            src={MdTokens[0].image_original_url}
                            className="galleryImage"
                            style={{borderTopLeftRadius: '0', borderBottomLeftRadius: '0', opacity: '.4'}}
                            onClick={() => tokenSelect(MdTokens[0])}
                            onMouseEnter={() => setHover('Md0')}
                            onMouseLeave={() => setHover('')}
                        />
                        {hover === 'Md0' && <marquee className="marquee" onMouseEnter={() => setHover('Md0')}>
                            <span className="mx-1">
                                {MdTokens[0].token_id}
                            </span>
                            <span className="mx-1">
                                {MdTokens[0].owner.user !== null && MdTokens[0].owner.user.username}
                            </span>
                        </marquee>}
                    </div>
                    <div style={{position: 'relative', width: '24.5%', margin: '0 .25%', height: '120%', borderRadius: '16px', border: '4px solid rgb(255 255 255 / 60%)'}}>
                        <img
                            src={MdTokens[1].image_original_url}
                            className="galleryImage"
                            style={{opacity: '.6'}}
                            onClick={() => tokenSelect(MdTokens[1])}
                            onMouseEnter={() => setHover('Md1')}
                            onMouseLeave={() => setHover('')}
                        />
                        {hover === 'Md1' && <marquee className="marquee" onMouseEnter={() => setHover('Md1')}>
                            <span className="mx-3">
                                {MdTokens[1].token_id}
                            </span>
                            <span className="mx-3">
                                {MdTokens[1].owner.user !== null && MdTokens[1].owner.user.username}
                            </span>
                        </marquee>}
                    </div>
                    <div style={{position: 'relative', width: '29.5%', margin: '0 .25%', height: '130%', borderRadius: '16px', border: '4px solid var(--pureWhite)'}}>
                        <img
                            src={MdTokens[2].image_original_url}
                            className="galleryImage"
                            onClick={() => tokenSelect(MdTokens[2])}
                            onMouseEnter={() => setHover('Md2')}
                            onMouseLeave={() => setHover('')}
                        />
                        {hover === 'Md2' && <marquee className="marquee" onMouseEnter={() => setHover('Md2')}>
                            <span className="mx-3">
                                {MdTokens[2].token_id}
                            </span>
                            <span className="mx-3">
                                {MdTokens[2].owner.user !== null && MdTokens[2].owner.user.username}
                            </span>
                        </marquee>}
                    </div>
                    <div style={{position: 'relative', width: '24.5%', margin: '0 .25%', height: '120%', borderRadius: '16px', border: '4px solid rgb(255 255 255 / 60%)'}}>
                        <img
                            src={MdTokens[3].image_original_url}
                            className="galleryImage"
                            style={{opacity: '.6'}}
                            onClick={() => tokenSelect(MdTokens[3])}
                            onMouseEnter={() => setHover('Md3')}
                            onMouseLeave={() => setHover('')}
                        />
                        {hover === 'Md3' && <marquee className="marquee" onMouseEnter={() => setHover('Md3')}>
                            <span className="mx-2">
                                {MdTokens[3].token_id}
                            </span>
                            <span className="mx-2">
                                {MdTokens[3].owner.user !== null && MdTokens[3].owner.user.username}
                            </span>
                        </marquee>}
                    </div>
                    <div style={{position: 'relative', width: '9.5%', margin: '0 .25%', height: '110%', borderRadius: '16px', border: '4px solid rgb(255 255 255 / 40%)', borderTopRightRadius: '0', borderBottomRightRadius: '0', borderRight: '0'}}>
                        <img
                            src={MdTokens[4].image_original_url}
                            className="galleryImage"
                            style={{borderTopRightRadius: '0', borderBottomRightRadius: '0', opacity: '.4'}}
                            onClick={() => tokenSelect(MdTokens[4])}
                            onMouseEnter={() => setHover('Md4')}
                            onMouseLeave={() => setHover('')}
                        />
                        {hover === 'Md4' && <marquee className="marquee" onMouseEnter={() => setHover('Md4')}>
                            <span className="mx-1">
                                {MdTokens[4].token_id}
                            </span>
                            <span className="mx-1">
                                {MdTokens[4].owner.user !== null && MdTokens[4].owner.user.username}
                            </span>
                        </marquee>}
                    </div>
                </div>

                <div
                    className={`w-100 d-none d-sm-flex d-md-none justify-content-between position-relative ${extraClassNames}`}
                    onMouseDown={onMouseDown}
                    onMouseUp={onMouseUp}
                    onTouchStart={onMouseDown}
                    onTouchEnd={onMouseUp}
                >
                    <div style={{position: 'relative', width: '28%', margin: '0 1%', height: '140%', borderRadius: '16px', border: '4px solid rgb(255 255 255 / 60%)', borderTopLeftRadius: '0', borderBottomLeftRadius: '0', borderLeft: '0'}}>
                        <img
                            src={SmTokens[0].image_original_url}
                            className="galleryImage"
                            style={{borderTopLeftRadius: '0', borderBottomLeftRadius: '0', opacity: '.6'}}
                            onClick={() => tokenSelect(SmTokens[0])}
                            onMouseEnter={() => setHover('Sm0')}
                            onMouseLeave={() => setHover('')}
                        />
                        {hover === 'Sm0' && <marquee className="marquee" onMouseEnter={() => setHover('Sm0')}>
                            <span className="mx-1">
                                {SmTokens[0].token_id}
                            </span>
                            <span className="mx-1">
                                {SmTokens[0].owner.user !== null && SmTokens[0].owner.user.username}
                            </span>
                        </marquee>}
                    </div>
                    <div style={{position: 'relative', width: '38%', margin: '0 1%', height: '150%', borderRadius: '16px', border: '4px solid var(--pureWhite)'}}>
                        <img
                            src={SmTokens[1].image_original_url}
                            className="galleryImage"
                            onClick={() => tokenSelect(SmTokens[1])}
                            onMouseEnter={() => setHover('Sm1')}
                            onMouseLeave={() => setHover('')}
                        />
                        {hover === 'Sm1' && <marquee className="marquee" onMouseEnter={() => setHover('Sm1')}>
                            <span className="mx-3">
                                {SmTokens[1].token_id}
                            </span>
                            <span className="mx-3">
                                {SmTokens[1].owner.user !== null && SmTokens[1].owner.user.username}
                            </span>
                        </marquee>}
                    </div>
                    <div style={{position: 'relative', width: '28%', margin: '0 1%', height: '140%', borderRadius: '16px', border: '4px solid rgb(255 255 255 / 60%)', borderTopRightRadius: '0', borderBottomRightRadius: '0', borderRight: '0'}}>
                        <img
                            src={SmTokens[2].image_original_url}
                            className="galleryImage"
                            style={{borderTopRightRadius: '0', borderBottomRightRadius: '0', opacity: '.6'}}
                            onClick={() => tokenSelect(SmTokens[2])}
                            onMouseEnter={() => setHover('Sm2')}
                            onMouseLeave={() => setHover('')}
                        />
                        {hover === 'Sm2' && <marquee className="marquee" onMouseEnter={() => setHover('Sm2')}>
                            <span className="mx-1">
                                {SmTokens[2].token_id}
                            </span>
                            <span className="mx-1">
                                {SmTokens[2].owner.user !== null && SmTokens[2].owner.user.username}
                            </span>
                        </marquee>}
                    </div>
                </div>

                <div
                className={`w-100 d-flex d-sm-none justify-content-between position-relative ${extraClassNames}`}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onTouchStart={onMouseDown}
                onTouchEnd={onMouseUp}
            >
                <div style={{position: 'relative', width: '13%', margin: '0 1%', height: '100%', borderRadius: '16px', border: '4px solid rgb(255 255 255 / 60%)', borderTopLeftRadius: '0', borderBottomLeftRadius: '0', borderLeft: '0'}}>
                    <img
                        src={SmTokens[0].image_original_url}
                        className="galleryImage"
                        style={{borderTopLeftRadius: '0', borderBottomLeftRadius: '0', opacity: '.6'}}
                        onClick={() => tokenSelect(SmTokens[0])}
                        onMouseEnter={() => setHover('Xs0')}
                        onMouseLeave={() => setHover('')}
                    />
                    {hover === 'Xs0' && <marquee className="marquee" onMouseEnter={() => setHover('Xs0')}>
                        <span className="mx-1">
                            {SmTokens[0].token_id}
                        </span>
                        <span className="mx-1">
                            {SmTokens[0].owner.user !== null && SmTokens[0].owner.user.username}
                        </span>
                    </marquee>}
                </div>
                <div style={{position: 'relative', width: '68%', margin: '0 1%', height: '110%', borderRadius: '16px', border: '4px solid var(--pureWhite)'}}>
                    <img
                        src={SmTokens[1].image_original_url}
                        className="galleryImage"
                        onClick={() => tokenSelect(SmTokens[1])}
                        onMouseEnter={() => setHover('Xs1')}
                        onMouseLeave={() => setHover('')}
                    />
                    {hover === 'Xs1' && <marquee className="marquee" onMouseEnter={() => setHover('Xs1')}>
                        <span className="mx-1">
                            {SmTokens[1].token_id}
                        </span>
                        <span className="mx-1">
                            {SmTokens[1].owner.user !== null && SmTokens[2].owner.user.username}
                        </span>
                    </marquee>}
                </div>
                <div style={{position: 'relative', width: '13%', margin: '0 1%', height: '100%', borderRadius: '16px', border: '4px solid rgb(255 255 255 / 60%)', borderTopRightRadius: '0', borderBottomRightRadius: '0', borderRight: '0'}}>
                    <img
                        src={SmTokens[2].image_original_url}
                        className="galleryImage"
                        style={{borderTopRightRadius: '0', borderBottomRightRadius: '0', opacity: '.6'}}
                        onClick={() => tokenSelect(SmTokens[2])}
                        onMouseEnter={() => setHover('Xs2')}
                        onMouseLeave={() => setHover('')}
                    />
                    {hover === 'Xs2' && <marquee className="marquee" onMouseEnter={() => setHover('Xs2')}>
                        <span className="mx-1">
                            {SmTokens[2].token_id}
                        </span>
                        <span className="mx-1">
                            {SmTokens[2].owner.user !== null && SmTokens[2].owner.user.username}
                        </span>
                    </marquee>}
                </div>
            </div>
            </>}
        </>
    )
}