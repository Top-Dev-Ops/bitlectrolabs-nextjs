import { useRouter } from 'next/router'
import styles from '../../styles/collection.module.css'

export default function CollectionRoadmap({ data, extraClassNames }) {
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
                    {data.title[0] !== undefined && data.title[0].text}
                </h3>

                {data.body_paragraph[0] !== undefined && (
                    <p className="my-3">
                        {data.body_paragraph[0].text}
                    </p>
                )}

                {data.support_text !== undefined && (
                    <ul className="mx-2">
                        {data.support_text.map((text, index) => (
                            <li className="text-white" key={`collection_roadmap_text_${index}`}>{text.text}</li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    )
}