import LinkTo from "../custom/LinkTo"
import { BsArrowRight } from "react-icons/bs"

export default function BuyNFTs() {
    return (
        <section className="buyNFTs">
          <h3 className="text-white">How to buy NFTs?</h3>
          <p className="text-white text-left text-sm-center">Read our newbie friendly guide with step by step instructions on how<br /> to participate in this emerging digital trend</p>
          <LinkTo
            href={'/'}
            text={'Full guide'}
            icon={<BsArrowRight />}
            extraClassNames="my-4"
          />
        </section>
    )
}