import LinkTo from "../custom/LinkTo"
import { BsArrowRight } from "react-icons/bs"

export default function MarketingBanner({ heading, paragraph, linkText, link }) {
    return (
        <section className="buyNFTs">
          <h3 className="text-white">{heading}</h3>
          <p className="text-white text-left text-sm-center">
            {paragraph}
          </p>
          <LinkTo
            href={`${link}`}
            text={`${linkText}`}
            icon={<BsArrowRight />}
            extraClassNames="my-4"
          />
        </section>
    )
}