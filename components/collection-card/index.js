import { useRouter } from "next/router"
import Progresser from "../custom/Progresser"

export default function CollectionCard({
    heading,
    categories,
    extraClassNames,
}) {

    const router = useRouter()

    return (
        <section className={`collection-card ${extraClassNames}`}>
            <h3
                className="mb-5"
                style={{
                    color: `${router.query.collection === 'Dreamers' ? 'var(--green900)' : 'undefined'}`,
                    backgroundClip: `${router.query.collection === 'Dreamers' ? 'inherit' : 'text'}`,
                    WebkitTextFillColor: `${router.query.collection === 'Dreamers' ? 'inherit' : 'transparent'}`,
                    background: `${router.query.collection === 'Dreamers' ? 'inherit' : undefined}`,
                }}
            >{heading}</h3>

            {categories.map(category =>
                <Progresser
                    key={`collection_stats_${category.category_title[0].text}_${category.category_description}`}
                    heading={`${category.category_title[0].text}`}
                    subHeading={`${category.category_name[0].text}`}
                    percentage={`${category.category_description}`}
                    extraClassNames={'mt-4'}
                />
            )}
        </section>
    )
}