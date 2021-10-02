import Footer from '../../components/footer'

import styles from '../../styles/news.module.css'

import Prismic from 'prismic-javascript'
import { Client } from '../../prismic-configuration'
import NewsCard from '../../components/news-card'

export default function NewsArticle({ news }) {

    const onTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    return (
        <section className={styles.news}>
            <NewsCard
                key={`news_${news.id}`}
                news={news}
                extraClassNames={'bg-transparent'}
            />

            {/* SOCIALS, LOGO & TERMS OF USE */}
            <Footer />

            <div
                className={styles.newsUpButton}
                onClick={onTop}
            >Up</div>
        </section>
    )
}

export async function getStaticPaths() {
    const news = await Client().query(
        Prismic.Predicates.at('document.type', 'news_page')
    )

    const paths = news.results.map(newsData => ({
        params: { news: newsData.id }
    }))

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const newses = await Client().query(
        Prismic.Predicates.at('document.type', 'news_page')
    )

    const news = newses.results.filter(newsData => newsData.id === params.news)

    return {
        props: {
            news: news.length > 0 ? news[0] : ''
        }
    }
}