import { useRef } from 'react'
import { ArrowButton } from '../custom/Button'
import RoadmapCard from './roadmap-card'

const Roadmap = () => {
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
            <RoadmapCard
                title={'September 9'}
                info={'Dreamloopers Snapshot'}
                description={'A snapshot of the Dreamloops holders will occur on this date, to determine who will receive free airdrops in the next phase.'}
                extraClassNames="mx-2"
            />
            <RoadmapCard
                title={'September 17'}
                info={'Dreamers CrossChain Airdrop'}
                description={'Airdrop of “Dreamers” on the Polygon network to Dreamloops holders during the airdrop.'}
                extraClassNames="mx-2"
            />
            <RoadmapCard
                title={'September 30'}
                info={'Dreamers Burn to Mint Event'}
                description={'Trade your Dreamloops for Dreamers using our “burn to mint” tool'}
                extraClassNames="mx-2"
            />
            <RoadmapCard
                title={'October 7'}
                info={'Dreamers Genesis Event and Sale'}
                description={'The remaining Dreamers will be sold in a public sale - and the cryostasis chambers can be unfrozen.'}
                extraClassNames="mx-2"
            />
            <RoadmapCard
                title={'October 7'}
                info={'Dreamers Genesis Event and Sale'}
                description={'The remaining Dreamers will be sold in a public sale - and the cryostasis chambers can be unfrozen.'}
                extraClassNames="mx-2"
            />
            <RoadmapCard
                title={'October 7'}
                info={'Dreamers Genesis Event and Sale'}
                description={'The remaining Dreamers will be sold in a public sale - and the cryostasis chambers can be unfrozen.'}
                extraClassNames="mx-2"
            />
        </div>
    </section>
}

export default Roadmap