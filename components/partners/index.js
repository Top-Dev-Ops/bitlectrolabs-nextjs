import Link from "next/link"

export default function Partners({ partners }) {

  const className = partners.length >= 4 ? 'col-6 col-sm-3 text-center'
  : partners.length === 3 ? 'col-6 col-sm-4 text-center'
  : partners.length === 2 ? 'col-6 text-center' : 'col-12 text-center'

  return (
      <section className="row partners">
        {partners.map(partner => (
          <div
            key={`partner_${partner.uid}`}
            className={className}
          >
            <Link href={`${partner.data.link.url}`}>
              <img src={`${partner.data.logo_image.url}`} />
            </Link>
          </div>
        ))}
      </section>
  )
}