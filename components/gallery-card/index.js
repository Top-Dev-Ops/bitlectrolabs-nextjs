import Badge from '../custom/Badge'
import Divider from '../custom/Divider'
import { TextButton } from '../custom/Button'

export default function GalleryCard({ extraClassNames, extraStyles }) {
    const data = {
        'Count': 'One',
        'Background': 'Abstract Sunset',
        'Music': 'Donny',
        'Percussion': 'Beat 14',
        'Redeemable?': 'Not Redeemable',
        'Scarcity': 'Common'
    }
    
    return (
        <section
            className={`gallery-card ${extraClassNames}`}
            style={extraStyles}
        >
            <div className="d-flex flex-column">
                <h3>ID: 9361</h3>
                <p>Dreamloops</p>

                <div>
                    <Badge
                        text={'Big Block'}
                        extraClassNames="mx-1 d-inline-block"
                        size="Lg"
                    />
                    <Badge
                        text={'Chrome Pyramid'}
                        extraClassNames="mx-1 d-inline-block"
                        size="Lg"
                    />
                    <Badge
                        text={'Artemisia Bust'}
                        extraClassNames="mx-1 d-inline-block"
                        size="Lg"
                    />
                </div>
            </div>

            <div className="w-100 d-flex flex-column my-5 my-lg-0">
                {Object.keys(data).map((key, index) => (
                    <div key={`gallery_card_${key}_${index}`}>
                        <div className="d-flex justify-content-between">
                            <p>{key}</p>
                            <p className="text-white">{data[key]}</p>
                        </div>

                        {index !== (Object.keys(data).length - 1) && (
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