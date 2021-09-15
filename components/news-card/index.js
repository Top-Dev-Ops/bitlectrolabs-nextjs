export default function NewsCard({ heading, image, children, extraClassNames }) {
    return (
        <div className={`news-card ${extraClassNames}`}>
            <div className="d-flex justify-content-between">
                <div className="d-flex justify-content-between">
                    <span>July 20</span>
                    <span className="d-none d-md-block mx-4">2 min read</span>
                </div>

                <span className="d-none d-md-block">Development update</span>
                <span className="d-block d-md-none">2 min read</span>
            </div>

            <h3 className="my-4 my-lg-5">{heading}</h3>

            <img
                src={`/images/${image}`}
                className="w-100 h-auto my-lg-3"
            />

            <p className="mt-3">
                {children}
            </p>

            <div className="mt-5">
                <span className="text-white">Read more</span>
            </div>
        </div>
    )
}