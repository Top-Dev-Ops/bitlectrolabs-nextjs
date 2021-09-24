import Badge from '../custom/Badge'
import Divider from '../custom/Divider'
import { TextButton } from '../custom/Button'

export default function GalleryCard({
    extraClassNames,
    extraStyles,
    token,
}) {

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
                />
                <TextButton
                    text={'View on OpenSea'}
                    variant={'primary'}
                    extraClassNames="w-100"
                />
            </div>
        </section>
    )
}