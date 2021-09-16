import styles from '../../styles/collection.module.css'

import Divider from '../custom/Divider'

export default function CollectionSubHeading({ overview, extraClassNames }) {
    return (
        <section className={`${styles.collectionSubHeadingLayout} ${extraClassNames}`}>
            <div className="row gx-0 my-5 py-5">
                <h3 className="my-3">
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