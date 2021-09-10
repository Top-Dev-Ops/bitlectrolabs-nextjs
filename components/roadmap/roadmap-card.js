import Divider from '../custom/Divider'

const RoadmapCard = ({ title, info, description, extraClassNames }) => {
    return <section className={`roadmap-card p-5 ${extraClassNames}`}>
        <h4>{title}</h4>

        <p>{info}</p>

        <Divider extraClassNames="my-4" />

        <p className="text-white">
            {description}
        </p>
    </section>
}

export default RoadmapCard