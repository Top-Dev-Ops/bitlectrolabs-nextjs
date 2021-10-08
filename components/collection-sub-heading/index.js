import { useRouter } from 'next/router'
import styles from '../../styles/collection.module.css'

import Divider from '../custom/Divider'

export default function CollectionSubHeading({ data, extraClassNames }) {
    const router = useRouter()

    return (
        <section className={`${styles.collectionSubHeadingLayout} ${extraClassNames}`}>
            <div className="row gx-0 my-5 py-5">
                {data.image !== undefined && (
                    <img
                        src={data.image.url}
                        className="w-100 h-auto mb-5"
                    />
                )}

                <h3
                    className="my-3"
                    style={{
                        color: `${router.query.collection === 'Dreamers' ? 'var(--green900)' : 'undefined'}`,
                        backgroundClip: `${router.query.collection === 'Dreamers' ? 'inherit' : 'text'}`,
                        WebkitTextFillColor: `${router.query.collection === 'Dreamers' ? 'inherit' : 'transparent'}`,
                        background: `${router.query.collection === 'Dreamers' ? 'inherit' : undefined}`,
                    }}
                >
                    {data.title[0] !== undefined && data.title[0].text}
                </h3>

                {data.body_paragraph[0] !== undefined && (
                    <p className="my-3">
                        {data.body_paragraph[0].text}
                    </p>
                )}

                {data.support_text[0] !== undefined && (
                    <>
                        <Divider extraClassNames={'custom-flexible-divider my-4'} />

                        <span className="my-3">
                            {data.support_text[0].text}
                        </span>
                    </>
                )}
            </div>
        </section>
    )
}