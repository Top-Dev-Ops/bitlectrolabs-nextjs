export default function Close({ onClick, extraClassNames }) {
    return (
        <button className={`hamburger bg-transparent border-0 outline-0 ${extraClassNames}`} onClick={onClick}>
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