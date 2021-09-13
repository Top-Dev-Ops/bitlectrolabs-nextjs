import Progresser from "../custom/Progresser"

export default function CollectionCard({
    heading,
    progresses,
    extraClassNames,
}) {

    return (
        <section className={`collection-card ${extraClassNames}`}>
            <h3 className="mb-5">{heading}</h3>

            {progresses.map(progress =>
                <Progresser
                    key={progress.heading}
                    heading={progress.heading}
                    subHeading={progress.subHeading}
                    percentage={progress.percentage}
                    extraClassNames={progress.extraClassNames}
                />
            )}
        </section>
    )
}