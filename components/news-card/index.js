import Link from "next/link"

export default function NewsCard({ news, extraClassNames, extraStyles }) {
    return (
        <Link href={`/news/${news.id}`}>
            <div className={`news-card ${extraClassNames}`}>
                <div style={extraStyles}>
                    <div className="d-flex justify-content-between">
                        <div className="d-flex justify-content-between">
                            <span>{news.data.date}</span>
                            <span className="d-none d-md-block mx-4">{news.data.time_to_read[0].text}</span>
                        </div>

                        <span className="d-none d-md-block">{news.data.sub_title[0].text}</span>
                        <span className="d-block d-md-none">{news.data.time_to_read[0].text}</span>
                    </div>

                    <h3 className="my-4 my-lg-5">{news.data.title[0].text}</h3>

                    <img
                        src={`${news.data.banner_image.url}`}
                        className="w-100 h-auto my-lg-3"
                    />

                    {news.data.article_with_subheading.map(articlew => (
                        <div key={`article_w_${articlew.text}`} className="mt-3">
                            {articlew.article_image !== undefined && articlew.article_image.url !== undefined && (
                                <img src={`${articlew.article_image.url}`} className="my-3" />
                            )}
                            <p className="my-3">{articlew.subheading !== undefined && articlew.subheading[0] !== undefined && articlew.subheading[0].text}</p>
                            <p className="my-3">{articlew.body_paragraph !== undefined && articlew.body_paragraph[0] !== undefined && articlew.body_paragraph[0].text}</p>
                        </div>
                    ))}

                    {news.data.article_without_subheading.map(articlewo => (
                        <div key={`article_wo_${articlewo.body_paragraph[0].text}`} className="mt-3">
                            {articlewo.article_image !== undefined && articlewo.article_image.url !== undefined && (
                                <img src={`${articlewo.article_image.url}`} className="my-3" />
                            )}
                            <p className="my-3">{articlewo.subheading !== undefined && articlewo.subheading[0] !== undefined && articlewo.subheading[0].text}</p>
                            <p className="my-3">{articlewo.body_paragraph !== undefined && articlewo.body_paragraph[0] !== undefined && articlewo.body_paragraph[0].text}</p>
                        </div>
                    ))}
                </div>

                {!extraClassNames.includes('bg-transparent') && <div className="mt-5">
                    <span className="text-white">Read more</span>
                </div>}
            </div>
        </Link>
    )
}