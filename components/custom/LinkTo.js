import Link from 'next/link'

const LinkTo = ({ text, icon, href, extraClassNames }) => {
    return (
        <Link href={href}>
            <a className={`custom-link ${extraClassNames}`}>
                {text}

                <span className="mx-3">
                    {icon}
                </span>
            </a>
        </Link>
    )
}

export default LinkTo