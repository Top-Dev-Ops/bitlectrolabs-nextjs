import XlGalleryList from "./xl-gallery-list"
import LgGalleryList from "./lg-gallery-list"
import MdGalleryList from "./md-gallery-list"
import SmGalleryList from "./sm-gallery-list"

export default function GalleryList({
    left,
    right,
    tokens,
    tokenSelect,
}) {

    const passTokens = tokens.length > 0 && tokens.length > 6 ? (
        tokens
     ) : tokens.length > 0 ? (
        tokens.concat([...Array(7 - tokens.length).keys()].map(index => tokens[index % tokens.length]))
     ) : []

    return (
        <>
            {passTokens.length > 0 && (
                <>
                    <section className="gallery-list">
                        {window.innerWidth >= 1200 ? (
                            <div className="w-100 h-100">
                                <XlGalleryList
                                    left={left}
                                    right={right}
                                    tokens={passTokens}
                                    tokenSelect={tokenSelect}
                                />
                            </div>
                        ) : window.innerWidth >= 992 ? (
                            <div className="w-100 h-100">
                                <LgGalleryList
                                    left={left}
                                    right={right}
                                    tokens={passTokens}
                                    tokenSelect={tokenSelect}
                                />
                            </div>
                        ) : window.innerWidth >= 768 ? (
                            <div className="w-100 h-100">
                                <MdGalleryList
                                    left={left}
                                    right={right}
                                    tokens={passTokens}
                                    tokenSelect={tokenSelect}
                                />
                            </div>
                        ) : window.innerWidth > 0 ? (
                            <div className="w-100 h-100">
                                <SmGalleryList
                                    left={left}
                                    right={right}
                                    tokens={passTokens}
                                    tokenSelect={tokenSelect}
                                />
                            </div>
                        ) : undefined}
                    </section>
                </>
            )}
        </>
    )
}
