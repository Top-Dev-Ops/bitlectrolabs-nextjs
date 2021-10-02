import NewsCard from '../../components/news-card'
import Footer from '../../components/footer'
import styles from '../../styles/news.module.css'

import Prismic from "prismic-javascript"
import { Client } from "../../prismic-configuration"

export default function News({ newses }) {

    const onTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    return (
        <section className={styles.news}>
            <section className={styles.newsCollection}>
                {newses.length > 0 && newses.map(news => (
                    <NewsCard
                        key={`news_${news.uid}`}
                        news={news}
                        extraClassNames="mb-5"
                        extraStyles={{overflow: 'hidden', maxHeight: '1200px'}}
                    />
                ))}
            </section>

            {/* SOCIALS, LOGO & TERMS OF USE */}
            <Footer />

            <div
                className={styles.newsUpButton}
                onClick={onTop}
            >Up</div>
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