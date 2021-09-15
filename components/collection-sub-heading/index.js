import styles from '../../styles/collection.module.css'

import Divider from '../custom/Divider'

export default function CollectionSubHeading({ extraClassNames }) {
    return (
        <section className={`${styles.collectionSubHeadingLayout} ${extraClassNames}`}>
            <div className="row gx-0 my-5 py-5">
                <h3 className="my-3">
                    As the first release from Bitlectro Labs, Dreamloops features programmatically generated 8-bit musical loops and 16-bit artwork produced by Keil Corcoran of the band STRFKR.
                </h3>

                <p className="my-3">
                    The &ldquo;album covers&rdquo; are inspired by classic gaming platforms such as the Amiga, PC98, and Super Nintendo and feature a retro-futuristic aesthetic. The music for each Dreamloop is composed entirely on a classic NES using a Midines cartridge. Each Dreamloop&prime;s music and art is unique and features elements of varying scarcity.
                </p>

                <Divider extraClassNames={'custom-flexible-divider my-4'} />

                <span className="my-3">
                    The owner of each Dreamloop receives a Creative Commons CC BY-ND license for their musical loop and a CC BY license for the visual composition to use as they see fit. This allows the user to utilize the audio of their Dreamloop within commercial works, as long as they credit Bitlectro Labs as the creator. Owners of Dreamloops can use the audio of their loops within their own video games, live streams, podcasts, etc. 
                </span>
            </div>
        </section>
    )
}