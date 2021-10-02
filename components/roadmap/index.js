import { useRef, useState } from 'react'
import { ArrowButton } from '../custom/Button'
import RoadmapCard from './roadmap-card'

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

export default function Roadmap({ roadmaps }) {
    const [touchStart, setTouchStart] = useState(0)
    const [mouseStart, setMouseStart] = useState(0)
    const roadmap = useRef()

    const onClickLeft = () => slide(false)
    const onClickRight = () => slide(true)

    const onTouchEnd = touchEnd => {
        if (touchStart - touchEnd > 150) {
            slide(true)
        }
        if (touchStart - touchEnd < -150) {
            slide(false)
        }
    }

    const onMouseUp = mouseEnd => {
        if (mouseStart - mouseEnd > 150) {
            slide(true)     // SLIDE TO RIGHT
        }
        if (mouseStart - mouseEnd < -150) {
            slide(false)    // SLIDE TO LEFT
        }
    }

    const easeInOutSquad = function(t, b, c, d) {
        t /= d/2;
        if (t < 1) return c/2*t*t + b;
        t--;
        return -c/2 * (t*(t-2) - 1) + b;
    }

    const slide = (direction) => {
        const start = roadmap.current.scrollLeft
        let currentTime = 0
        const increment = 20
        const end = direction ? 380 : -380
        
        const animateScroll = function() {
            currentTime += increment
            const val = easeInOutSquad(currentTime, start, end, 500)
            roadmap.current.scrollLeft = val
            if (currentTime < 500) {
                setTimeout(animateScroll, increment)
            }
        }

        animateScroll()
    }

    return (
        <section className="roadmap"
            onTouchStart={e => setTouchStart(e.targetTouches[0].clientX)}
            onTouchEnd={e => onTouchEnd(e.changedTouches[0].clientX)}
            onMouseDown={e => {
                e.preventDefault()
                setMouseStart(e.clientX)
            }}
            onMouseUp={e => {
                e.preventDefault()
                onMouseUp(e.clientX)
            }}
        >
            <div className="roadmap-header">
                <h3>The Roadmap</h3>

                <div className="d-none d-lg-block">
                    <ArrowButton
                        direction="left"
                        extraClassNames="mx-0 mx-lg-2"
                        onClick={onClickLeft}
                    />
                    <ArrowButton
                        direction="right"
                        onClick={onClickRight}
                    />
                </div>
            </div>

            <div ref={roadmap} className="roadmap-content">
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
    )
}