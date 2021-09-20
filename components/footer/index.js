import Link from "next/link"
import Social from "../social"

export default function Footer() {
    return (
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

            <div className="col-12 col-lg-4 mb-2 mb-lg-0 terms-link">
                <div className="social d-flex justify-content-center align-items-center">
                    <p className="my-0" style={{fontSize: 'var(--subHeadingMd)', color: 'var(--midGray400)'}}>
                        <Link href="/terms">
                            <a>Terms of Use</a>
                        </Link>
                    </p>
                </div>
            </div>

            <style jsx>{`
                .terms-link a {
                    color: var(--midGray400);
                }
                .terms-link a:hover {
                    color: var(--pureWhite);
                }
            `}</style>
        </section>
    )
}