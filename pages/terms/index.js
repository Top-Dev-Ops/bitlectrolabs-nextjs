import Footer from '../../components/footer'
import styles from '../../styles/terms.module.css'
import data from '../../components/custom/data'

import { Client } from '../../prismic-configuration'
import Prismic from 'prismic-javascript'

export default function Terms({ termsHeaders, termsBodies }) {

    return (
        <section className={styles.terms}>
            <div className={styles.termsContent}>
                <h3>Terms of Use</h3>
                <span>Last Updated: {termsHeaders[0].data.date[0].text}</span>

                {termsHeaders[0].data.header_text.map((header, index) => (
                    <p key={`terms_header_${index}`} className={index === 0 ? 'mt-5' : undefined}>
                        {header.header_text_item[0].text}
                    </p>
                ))}

                {termsBodies.map((termBody, index) => (
                    <div key={`terms_paragraph_${index}`}>
                        <h4 className="mt-5 mb-3">
                            {termBody.data.heading[0].text}
                        </h4>
                        {termBody.data.content.map((text, textIndex) => (
                            <p key={`terms_paragraph_text_${textIndex}`}>
                                {text.content_item[0].text}
                            </p>
                        ))}
                    </div>
                ))}
            </div>

            <Footer />
        </section>
    )
}

export async function getStaticProps() {
    const termsHeaders = await Client().query(
        Prismic.Predicates.at('document.type', 'terms_header')
    )

    const termsBodies = await Client().query(
        Prismic.Predicates.at('document.type', 'terms_body')
    )

    return {
        props: {
            termsHeaders: termsHeaders.results.sort((a, b) => new Date(a.first_publication_date) - new Date(b.first_publication_date)),
            termsBodies: termsBodies.results.sort((a, b) => new Date(a.first_publication_date) - new Date(b.first_publication_date))
        }
    }
}