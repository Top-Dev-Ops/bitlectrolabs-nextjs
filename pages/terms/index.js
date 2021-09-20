import Footer from "../../components/footer"
import styles from '../../styles/terms.module.css'
import data from './data'

export default function Terms() {
    return (
        <section className={styles.terms}>
            <div className={styles.termsContent}>
                <h3>Terms of Use</h3>
                <span>Last Updated: June 12, 2021</span>

                <p className="my-3">
                    These Terms of Use constitute a legally binding agreement made between the user (&ldquo;you&rdquo;), whether personally or on behalf of an entity and Bitlectro Labs, domiciled in the United States. (The Company&rdquo;;&ldquo;we&rdquo;) concerning your access to and use of bitlectrolabs.com website and the smart-contract based Bitlectro Labs application (&ldquo;App&rdquo; or &ldquo;Application&rdquo;) as well as any other media form, media channel, mobile website or mobile application, smart contracts related, linked, or otherwise connected thereto (the &ldquo;website&rdquo;, Site&rdquo; and the &ldquo;App&rdquo;).
                </p>
                <p>
                    Bitlectro Labs Dreamloops are a digital art/music collectible built on top of the Ethereum network. The collection consists of 10,000 unique digital album covers and musical loops (the &ldquo;Dreamloops&rdquo; or &ldquo;Art&rdquo;) that are hashed on the blockchain and are represented by a non-fungible token (&ldquo;NFT&rdquo;) each. The Dreamloops smart contract allows participants to purchase the NFT representing the album art and musical loop. The Company does not provide or intend to provide a secondary marketplace for the NFT. Bitlectro Labs will provide a user interface to visualize digital art and listen to the audio loop. After the sale of an NFT to you, the ownership of the NFT, and to the connected Art, is transferred from the Ethereum smart contract to the purchaser and concludes the business transaction between both parties.
                </p>
                <p>
                    The Company is selling the Art via the NFT and is making the Application available to you. Before you purchase an NFT and use the UI and the Ethereum smart contracts, however, you will need to agree to these Terms of Use and any terms and conditions incorporated herein by reference (collectively, these &ldquo;Terms&rdquo;).
                </p>
                <p>
                    PLEASE READ THESE TERMS CAREFULLY BEFORE MAKING A PURCHASE OF AN NFT AND/OR USING THE APP. THESE TERMS GOVERN YOUR PURCHASE of NFT AND USE OF THE APPLICATION, UNLESS THE COMPANY HAS EXECUTED A SEPARATE WRITTEN AGREEMENT WITH YOU FOR THAT PURPOSE. THE COMPANY IS ONLY WILLING TO MAKE THE NFT AND THE APP AVAILABLE TO YOU IF YOU ACCEPT ALL OF THESE TERMS. BY USING THE APPLICATION, OR ANY PART OF THEM, OR BY PURCHASING A BITLECTRO LABS NFT, YOU ARE CONFIRMING THAT YOU FULLY UNDERSTAND AND AGREE TO BE BOUND BY ALL OF THESE TERMS. IF YOU ARE ACCEPTING THESE TERMS ON BEHALF OF A COMPANY OR OTHER LEGAL ENTITY, YOU REPRESENT THAT YOU HAVE THE LEGAL AUTHORITY TO ACCEPT THESE TERMS ON THAT ENTITY’S BEHALF, IN WHICH CASE &ldquo;YOU&rdquo; WILL MEAN THAT ENTITY. IF YOU DO NOT HAVE SUCH AUTHORITY, OR IF YOU DO NOT ACCEPT ALL OF THESE TERMS, THEN WE ARE UNWILLING TO MAKE THE APP, THE SMART CONTRACTS, OR THE SITE AVAILABLE TO YOU. IF YOU DO NOT AGREE TO THESE TERMS, YOU MAY NOT ACCESS OR USE THE APP, THE SMART CONTRACTS, OR THE SITE.
                </p>

                {data.map((paragraph, index) => (
                    <div key={`terms_paragraph_${index}`}>
                        <h4 className="mt-5 mb-3">
                            {paragraph.heading}
                        </h4>
                        {paragraph.content.map((text, textIndex) => (
                            <p key={`terms_paragraph_text_${textIndex}`}>
                                {text}
                            </p>
                        ))}
                    </div>
                ))}
            </div>
            <Footer />
        </section>
    )
}