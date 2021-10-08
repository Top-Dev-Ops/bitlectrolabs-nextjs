import { useRouter
 } from 'next/router'
import styles from '../../styles/collection.module.css'

import Divider from '../custom/Divider'

export default function CollectionSubHeading({ overview, extraClassNames }) {
    const router = useRouter()

    return (
        <section className={`${styles.collectionSubHeadingLayout} ${extraClassNames}`}>
            <div className="row gx-0 my-5 py-5">
                <h3
                    className="my-3"
                    style={{
                        color: `${router.query.collection === 'Dreamers' ? 'var(--green900)' : 'undefined'}`,
                        backgroundClip: `${router.query.collection === 'Dreamers' ? 'inherit' : 'text'}`,
                        WebkitTextFillColor: `${router.query.collection === 'Dreamers' ? 'inherit' : 'transparent'}`,
                        background: `${router.query.collection === 'Dreamers' ? 'inherit' : undefined}`,
                    }}
                >
                    {overview.title[0].text}
                </h3>

                <p className="my-3">
                    {overview.body_paragraph[0].text}
                </p>

                <Divider extraClassNames={'custom-flexible-divider my-4'} />

                <span className="my-3">
                    {overview.support_text[0].text}
                </span>
            </div>
        </section>
    )
}