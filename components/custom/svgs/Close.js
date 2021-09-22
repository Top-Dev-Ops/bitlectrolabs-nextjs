export default function Close({ onClick, extraClassNames, extraStyles }) {
    return (
        <button
            className={`hamburger bg-transparent border-0 outline-0 ${extraClassNames}`}
            onClick={onClick}
            style={extraStyles}
        >
            <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M0.820898 4.78455C-0.273634 3.69002 -0.273632 1.91543 0.820899 0.820899C1.91543 -0.273633 3.69002 -0.273633 4.78455 0.820899L29.1791 25.2155C30.2736 26.31 30.2736 28.0846 29.1791 29.1791C28.0846 30.2736 26.31 30.2736 25.2154 29.1791L0.820898 4.78455Z" fill="current"/>
                <path d="M25.2155 0.820898C26.31 -0.273633 28.0846 -0.273632 29.1791 0.8209C30.2736 1.91543 30.2736 3.69002 29.1791 4.78455L4.78455 29.1791C3.69002 30.2736 1.91543 30.2736 0.820903 29.1791C-0.273629 28.0846 -0.273629 26.31 0.820903 25.2154L25.2155 0.820898Z" fill="current"/>
            </svg>
        </button>
    )
}

export const CloseFilter = ({ onClick, extraClassNames, extraStyles }) => {
    return (
        <button
            className={`bg-transparent border-0 outline-0 ${extraClassNames}`}
            style={extraStyles}
            onClick={onClick}
        >
            <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                xmlns="http://www.w3.org/2000/svg"
                className="icon"
            >
                <path
                    d="M0 20C0 8.95431 8.95431 0 20 0V0C31.0457 0 40 8.95431 40 20V20C40 31.0457 31.0457 40 20 40V40C8.95431 40 0 31.0457 0 20V20Z"
                />
                <path
                    d="M12.3182 13.8545C11.894 13.4303 11.894 12.7424 12.3182 12.3182C12.7425 11.8939 13.4303 11.8939 13.8546 12.3182L27.6818 26.1453C28.1061 26.5696 28.1061 27.2574 27.6818 27.6816C27.2576 28.1059 26.5697 28.1059 26.1454 27.6816L12.3182 13.8545Z"
                />
                <path
                    d="M26.1454 12.3184C26.5697 11.8941 27.2575 11.8941 27.6818 12.3184C28.106 12.7426 28.106 13.4304 27.6818 13.8547L13.8546 27.6818C13.4303 28.1061 12.7424 28.1061 12.3182 27.6818C11.8939 27.2576 11.8939 26.5697 12.3182 26.1455L26.1454 12.3184Z"
                />
            </svg>

            <style jsx>{`
                .icon {
                    fill: #676972;
                }
                .icon path:first-child {
                    fill: #131315;
                }
                .icon:hover {
                    fill: var(--pureWhite);
                }
                .icon:hover path:first-child {
                    fill: var(--midGray900);
                }
            `}</style>
        </button>
    )
}