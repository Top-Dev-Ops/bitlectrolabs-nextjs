import { SandBox, Polygon, Chainlink, Mage } from '../custom/svgs'

export default function Brands() {
    return (
        <section
          className="row brands"
        >
          <div className="col-6 col-sm-3 text-center">
            <SandBox />
          </div>
          <div className="col-6 col-sm-3 text-center">
            <Polygon />
          </div>
          <div className="col-6 col-sm-3 text-center">
            <Chainlink />
          </div>
          <div className="col-6 col-sm-3 text-center">
            <Mage />
          </div>
        </section>
    )
}