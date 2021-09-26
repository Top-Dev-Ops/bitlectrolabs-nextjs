import XlGalleryList from "./xl-gallery-list"
import LgGalleryList from "./lg-gallery-list"
import MdGalleryList from "./md-gallery-list"
import SmGalleryList from "./sm-gallery-list"

export default function GalleryList({
    left,
    right,
    tokens,
    tokenSelect
}) {
    return (
        <>
            {tokens.length > 0 && (
                <>
                    <section className="gallery-list">
                        <div className="d-none d-xl-block w-100 h-100">
                            <XlGalleryList
                                left={left}
                                right={right}
                                tokens={tokens}
                                tokenSelect={tokenSelect}
                            />
                        </div>
                        <div className="d-none d-lg-block d-xl-none w-100 h-100">
                            <LgGalleryList
                                left={left}
                                right={right}
                                tokens={tokens}
                                tokenSelect={tokenSelect}
                            />
                        </div>
                        <div className="d-none d-md-block d-lg-none w-100 h-100">
                            <MdGalleryList
                                left={left}
                                right={right}
                                tokens={tokens}
                                tokenSelect={tokenSelect}
                            />
                        </div>
                        <div className="d-block d-md-none w-100 h-100">
                            <SmGalleryList
                                left={left}
                                right={right}
                                tokens={tokens}
                                tokenSelect={tokenSelect}
                            />
                        </div>
                    </section>
                </>
            )}
        </>
    )
}
