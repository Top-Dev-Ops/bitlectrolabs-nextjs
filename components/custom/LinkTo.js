import Link from 'next/link'

const LinkTo = ({ text, icon, href, extraClassNames }) => {

    return (
        <div className={`custom-link ${extraClassNames}`}>
            {text}

            <Link href={href}>
                <a>
                    <span className="mx-3">
                        {icon}
                    </span>
                </a>
            </Link>
        </div>
    )
}

export default LinkTo