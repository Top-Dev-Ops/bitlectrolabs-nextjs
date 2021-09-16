import { useRef } from 'react'
import { ArrowButton } from '../custom/Button'
import RoadmapCard from './roadmap-card'

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

export default function Roadmap({ roadmaps }) {
    const roadmap = useRef()
    
    const onClickLeft = () => roadmap.current.scrollLeft -= 50

    const onClickRight = () => roadmap.current.scrollLeft += 50

    return <section className="roadmap">
        <div className="roadmap-header">
            <h3>The Roadmap</h3>

            <div className="d-none d-lg-block">
                <ArrowButton
                    direction="left"
                    extraClassNames="mx-2"
                    onClick={onClickLeft}
                />
                <ArrowButton
                    direction="right"
                    onClick={onClickRight}
                />
            </div>
        </div>

        <div ref={roadmap} className="roadmap-content" >
            {roadmaps.length > 0 && roadmaps.map(roadmap => {
                const d = new Date(roadmap.data.date)

                return <RoadmapCard
                    key={`roadmap_${roadmap.uid}`}
                    title={`${monthNames[d.getMonth()]} ${d.getDate()}`}
                    info={`${roadmap.data.title[0].text}`}
                    description={`${roadmap.data.body_paragraph[0].text}`}
                    extraClassNames="mx-2"
                />
            })}
        </div>
    </section>
}