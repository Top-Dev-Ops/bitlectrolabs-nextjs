import { TextButton, SVGButton } from "../custom/Button"

import { Grid, Settings } from "../custom/svgs"
import { ArrowButton } from "../custom/Button"

const GalleryFooter = () => {
    return <section className="gallery-footer row">
        <div className="col-12 col-lg-6 d-flex flex-row mb-2 mb-lg-0">
            <div className="gallery-footer-text-button mr-0 mx-xl-2">
                <TextButton text='Dreamloops' extraClassNames={'active'} />
                <TextButton text='Dreamers' extraClassNames={'mx-1 mx-lg-0'} />
                <TextButton text='STRFKR' extraClassNames={''} />
            </div>
            <SVGButton icon={<Grid />} extraClassNames="d-none d-xl-block" />
        </div>

        <div className="col-12 col-lg-6 d-flex flex-row justify-content-between justify-content-sm-start flex-lg-row-reverse">
            <TextButton text={'About collection'} extraClassNames="mx-1" />
            <div className="d-inline-flex flex-row-reverse">
                <SVGButton icon={<Settings />} extraClassNames={'mx-1'} />
                <SVGButton icon={<Grid />} extraClassNames="d-block d-xl-none mx-1" />
            </div>
        </div>

        <div className="gallery-footer-arrow d-flex justify-content-center">
            <ArrowButton direction="left" extraClassNames={'mx-2'} />
            <ArrowButton direction="right" />
        </div>
    </section>
}

export default GalleryFooter