import React, { useState } from 'react'
import { useRouter } from 'next/router'

import Badge from '../custom/Badge'
import Divider from '../custom/Divider'
import { TextButton, SVGButton } from '../custom/Button'

import { UNWRAP_TOKEN } from '../../services/contract'
import Plus from '../custom/svgs/Plus'
import Minus from '../custom/svgs/Minus'

export default function GalleryCard({
    extraClassNames,
    extraStyles,
    token,
}) {
    const [count, setCount] = useState(1)
    const [purchased, setPurchased] = useState(false)
    const router = useRouter()

    const unwrapToken = () => {
        console.log(token)
        UNWRAP_TOKEN(token.token_id)
    }

    const purchaseToken = () => {
        setPurchased(true)
        console.log(token)
    }

    return (
        <section
            className={`gallery-card ${extraClassNames}`}
            style={extraStyles}
        >
            <div className="d-flex flex-column">
                <h3>ID: {token.token_id}</h3>
                <p>{token.collection.name}</p>

                <div>
                    {token.owner.user !== null && (
                        <Badge
                            text={token.owner.user.username}
                            extraClassNames="mx-1 d-inline-block"
                            size="Lg"
                        />
                    )}
                </div>
            </div>

            {router.pathname !== '/sale' ? (
                <>
                    <div className="w-100 d-flex flex-column my-5 my-lg-0">
                        {token.traits.map((trait, index) => (
                            <div key={`gallery_card_${trait.trait_count}_${index}`}>
                                <div className="d-flex justify-content-between">
                                    <p className="text-capitalize">
                                        {trait.trait_type}
                                    </p>
                                    <p className="text-white">
                                        {trait.value}
                                    </p>
                                </div>

                                {index !== token.traits.length - 1 && (
                                    <Divider extraClassNames="mb-3" />
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="w-100 d-flex flex-column">
                        <TextButton
                            text={'UnWrap Token'}
                            variant={'secondary'}
                            extraClassNames="w-100 mb-3"
                            onClick={unwrapToken}
                        />
                        <TextButton
                            text={'View on OpenSea'}
                            variant={'primary'}
                            extraClassNames="w-100"
                            onClick={() => window.open(token.permalink, '_blank')}
                        />
                    </div>
                </>
            ) : (
                <>
                    <div className="w-100">
                        <div className="w-100 d-flex justify-content-between my-5">
                            <span style={{fontSize: 'var(--textMd)', color: 'var(--midGray400)'}}>
                                Current price
                            </span>
                            <span style={{fontSize: 'var(--textMd)', color: 'var(--pureWhite)'}}>
                                0.02111 ETH
                            </span>
                        </div>

                        <div className="w-100 d-flex justify-content-between align-items-center my-5">
                            <SVGButton
                                extraClassNames="custom-button-svg-num"
                                icon={<Minus />}
                                onClick={() => setCount(count === 1 ? 1 : count-1)}
                            />
                            <h1 className="my-0" style={{color: 'var(--pureWhite)', fontSize: 'var(--subHeadingLg)'}}>
                                {count}
                            </h1>
                            <SVGButton
                                extraClassNames="custom-button-svg-num"
                                icon={<Plus />}
                                onClick={() => setCount(count + 1)}
                            />
                        </div>

                        <Divider extraClassNames="my-5" />

                        <div className="w-100 d-flex justify-content-between my-5">
                            <span style={{fontSize: 'var(--textMd)', color: 'var(--midGray400)'}}>
                                Current price
                            </span>
                            <span style={{fontSize: 'var(--textMd)', color: 'var(--pureWhite)'}}>
                                0.02111 ETH
                            </span>
                        </div>

                        <div className="w-100 d-flex justify-content-end my-5">
                            <span style={{fontSize: 'var(--textMd)', color: 'var(--midGray400)'}}>
                                + gas
                            </span>
                        </div>
                    </div>

                    {purchased && (
                        <div className="purchase-message">
                            <p>Thank you for your purchase!</p>
                        </div>
                    )}

                    <TextButton
                        text={'Purchase'}
                        variant={'tertiary'}
                        extraClassNames="w-100"
                        onClick={purchaseToken}
                    />
                </>
            )}
        </section>
    )
}