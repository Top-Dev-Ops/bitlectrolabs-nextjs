import Link from 'next/link'

const LinkTo = ({ text, icon, href, extraClassNames }) => {

    return (
        <div className={`custom-link ${extraClassNames}`}>
            {text}

            <Link href={href}>
                <span className="mx-3">
                    {icon}
                </span>
            </Link>
        </div>
    )
}

export default LinkTo