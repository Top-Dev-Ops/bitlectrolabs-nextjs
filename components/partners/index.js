import Link from "next/link"

export default function Partners({ partners }) {
    return (
        <section className="row partners">
          {partners.map(partner => (
            <div
              key={`partner_${partner.uid}`}
              className="col-6 col-sm-3 text-center"
            >
              <Link href={`${partner.data.link.url}`}>
                <img src={`${partner.data.logo_image.url}`} />
              </Link>
            </div>
          ))}
        </section>
    )
}