import NewsCard from '../../components/news-card'
import Social from '../../components/social'
import styles from '../../styles/news.module.css'

export default function News() {

    return (
        <section className="d-flex flex-column">
            <section className={styles.news}>
                <NewsCard
                    heading={'Bitlectro Labs Monthly Party Series Continues Friday July 23rd'}
                    image={'news1.png'}
                    extraClassNames="mb-5"
                >
                    Bitlectro Labs monthly Metaverse party series continues, this month featuring Nifty Drops in support of their recent mobile application launch, and the Graffiti Kings!
                    Located in the Cryptovoxels Metaverse in Bitlectro Labs’ Gallery. You can access the gallery via this link, no download required, come party right in your browser window — https://www.cryptovoxels.com/parcels/989 — click “visit” to join the space.
                    Featuring DJs: Gables, Doodle Do, The Orion Lion, Ultra Visitor, and GARBAGEFACE feat. Bad Mayor.
                    Win free Dreamloops at the party, giveaways every 20 minutes, must be present to win! Come boogie in the Metaverse!
                    Cryptovoxels costume contest happening as well, wear your best voxels gear!
                    Also screening Episode 1 of “Yawn of the Apes”
                    Add this to your calendar here:
                    https://nftcalendar.io/event/bitlectro-labs-monthly-nft-metaverse-party-featuring-nifty-drops-and-graffiti-kings/?ical=1&tribe_display=
                    Those interested in being featured for future parties, reach out to us at admin@bitlectrolabs.com
                </NewsCard>

                <NewsCard
                    heading={'What Bitlectro Labs is Doing to Make Our Launch a Success'}
                    image={'news2.png'}
                    extraClassNames="mb-4"
                >
                    In the recent ecosystem of NFTs there have been some great launches, and some not so great launches (projects which will remain nameless here). Across our social media and communication channels we routinely get inquiries about how we will mitigate the missteps of other NFT releases. While we have answered many of these inquiries already, we think it is prudent to address them in a statement here.

                    So what is Bitlectro Labs doing to create a smooth launch for Dreamloops?

                    Within the purchase process we have implemented the following:
                    1. A purchase limit of 100 Dreamloops per transaction. This does several things. A purchase limit reduces the amount of gas that can potentially be…

                </NewsCard>    
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