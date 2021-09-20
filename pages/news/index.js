import NewsCard from '../../components/news-card'
import Footer from '../../components/footer'
import styles from '../../styles/news.module.css'

import Prismic from "prismic-javascript"
import { Client } from "../../prismic-configuration"

export default function News({ newses }) {

    return (
        <section className="d-flex flex-column">
            <section className={styles.news}>
                {newses.length > 0 && newses.map(news => (
                    <NewsCard
                        key={`news_${news.uid}`}
                        news={news}
                        extraClassNames="mb-5"
                    />
                ))}
            </section>

            {/* SOCIALS, LOGO & TERMS OF USE */}
            <Footer />
        </section>
    )
}

export async function getStaticProps() {
    const news = await Client().query(
        Prismic.Predicates.at('document.type', 'news_page')
    )

    return {
        props: {
            newses: news.results
        }
    }
}