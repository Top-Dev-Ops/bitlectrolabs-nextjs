export default function CollectionParagraph({
    heading,
    content,
    extraClassNames,
}) {

    return (
        <section className={`collection-paragraph ${extraClassNames}`}>
            <div className="row gx-0">
                <div className="col-12 col-md-3">
                    <h4 className="mt-3">{heading}</h4>
                </div>

                <div className="col-12 col-md-9 col-xl-8 offset-xl-1">
                    {typeof content === 'string' ?
                        <p className="mt-3">{content}</p> :
                        <div className="mt-3">
                            {content.map((para, index) => <p key={`collection_para_${index}`}>{para}</p>)}
                        </div>
                    }
                </div>
            </div>
        </section>
    )
}