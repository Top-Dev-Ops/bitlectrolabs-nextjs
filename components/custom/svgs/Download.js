export default function Download() {
    return (
        <div className="d-inline-flex">
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="icon"
            >
                <path
                    d="M19 18L5 18C4.44772 18 4 18.4477 4 19C4 19.5523 4.44772 20 5 20L19 20C19.5523 20 20 19.5523 20 19C20 18.4477 19.5523 18 19 18Z"
                    fill="current"
                />
                <path
                    d="M4 17L4 19C4 19.5523 4.44772 20 5 20C5.55228 20 6 19.5523 6 19L6 17C6 16.4477 5.55229 16 5 16C4.44772 16 4 16.4477 4 17Z"
                    fill="current"
                />
                <path
                    d="M18 17L18 19C18 19.5523 18.4477 20 19 20C19.5523 20 20 19.5523 20 19L20 17C20 16.4477 19.5523 16 19 16C18.4477 16 18 16.4477 18 17Z"
                    fill="current"
                />
                <path
                    d="M16 10C16.1552 10 16.3084 10.0362 16.4472 10.1056C16.5861 10.175 16.7069 10.2758 16.8 10.4C16.8788 10.5051 16.9361 10.6246 16.9687 10.7518C17.0013 10.8791 17.0085 11.0114 16.9899 11.1414C16.9714 11.2714 16.9274 11.3965 16.8605 11.5095C16.7936 11.6225 16.7051 11.7212 16.6 11.8L12.6 14.8C12.4287 14.9252 12.2221 14.9926 12.01 14.9926C11.7979 14.9926 11.5913 14.9252 11.42 14.8L7.42 11.98C7.20441 11.8271 7.05814 11.595 7.01317 11.3345C6.9682 11.0741 7.02818 10.8064 7.18 10.59C7.25579 10.4819 7.35225 10.3898 7.46381 10.3191C7.57537 10.2484 7.69982 10.2006 7.82999 10.1783C7.96015 10.1559 8.09344 10.1596 8.22217 10.1891C8.3509 10.2186 8.47252 10.2733 8.58 10.35L12 12.76L15.4 10.2C15.5731 10.0702 15.7836 10 16 10Z"
                    fill="current"
                />
                <path
                    d="M12 3C12.2652 3 12.5196 3.10536 12.7071 3.29289C12.8946 3.48043 13 3.73478 13 4L13 12C13 12.2652 12.8946 12.5196 12.7071 12.7071C12.5196 12.8946 12.2652 13 12 13C11.7348 13 11.4804 12.8946 11.2929 12.7071C11.1054 12.5196 11 12.2652 11 12L11 4C11 3.73478 11.1054 3.48043 11.2929 3.29289C11.4804 3.10536 11.7348 3 12 3Z"
                    fill="current"
                />
            </svg>

            <span>Download</span>

            <style jsx>{`
                div {
                    fill: var(--midGray400);
                    color: var(--midGray400);
                }
                div > span {
                    font-size: var(--subHeadingSm);
                    margin-left: 5px;
                }
                div:hover {
                    fill: var(--pureWhite);
                    color: var(--pureWhite);
                    cursor: url('/pointer1.svg') 0 0, pointer;
                }
            `}</style>
        </div>
    )
}