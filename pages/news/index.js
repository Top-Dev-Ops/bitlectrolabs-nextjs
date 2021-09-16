import NewsCard from '../../components/news-card'
import Social from '../../components/social'
import styles from '../../styles/news.module.css'

import Prismic from "prismic-javascript"
import { Client } from "../../prismic-configuration"

export default function News({ newses }) {
    console.log(newses)

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
            <section className="row gx-0" style={{width: '96%', margin: '2vh 2% 2vh 2%'}}>
                <div className="col-12 col-lg-4 mb-2 mb-lg-0">
                    <Social />
                </div>

                <div className="col-12 col-lg-4 mb-2 mb-lg-0 px-lg-3">
                    <div className="social d-flex justify-content-center align-items-center">
                    <p className="my-0" style={{fontSize: 'var(--subHeadingMd)', color: 'var(--midGray400)'}}>
                        ©BitlectroLabs 2021
                    </p>
                    </div>
                </div>

                <div className="col-12 col-lg-4 mb-2 mb-lg-0">
                    <div className="social d-flex justify-content-center align-items-center">
                    <p className="my-0" style={{fontSize: 'var(--subHeadingMd)', color: 'var(--midGray400)'}}>
                        Terms of Use
                    </p>
                    </div>
                </div>
            </section>
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