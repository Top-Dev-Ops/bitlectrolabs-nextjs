import Link from "next/link"
import Social from "../social"

export default function Footer() {
    return (
        <section className="row gx-0">
            <div className="col-12 col-lg-4 mb-2 mb-lg-0">
                <Social />
            </div>

            <div className="col-12 col-lg-4 mb-2 mb-lg-0 px-lg-3">
                <div className="social d-flex justify-content-center align-items-center">
                    <p className="my-0">
                        ©BitlectroLabs 2021
                    </p>
                </div>
            </div>

            <div className="col-12 col-lg-4 mb-2 mb-lg-0 terms-link">
                <div className="social d-flex justify-content-center align-items-center">
                    <p className="my-0">
                        <Link href={1 === 2 ? '/terms' : 'https://pastebin.com/raw/mfcQUZRm'}>
                            <a>Terms of Use</a>
                        </Link>
                    </p>
                </div>
            </div>

            <style jsx>{`
                section {
                    width: 96%;
                    margin: 2vh 2%;
                    z-index: 10;
                }
                p {
                    font-family: Platform;
                    font-size: var(--subHeadingMd);
                    color: var(--midGray400);
                }
                .terms-link a {
                    color: var(--midGray400);
                    font-family: Platform;
                }
                .terms-link a:hover {
                    color: var(--pureWhite);
                }
            `}</style>
        </section>
    )
}