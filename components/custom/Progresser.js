const Progresser = ({ heading, subHeading, percentage, extraClassNames }) => {
    return (
        <div className={`custom-progress ${extraClassNames}`}>
            <div className="d-flex flex-row justify-content-between align-items-center">
                <p>
                    {`${percentage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}  "${heading}"`}
                </p>
                <span className="d-none d-sm-block">{subHeading}</span>
            </div>

            <div className="d-flex justify-content-between h-100">
                {[...Array(50).keys()].map(index =>
                    percentage > index ?
                    <div key={`filled_${index}`} className="custom-box-filled" /> :
                    <div key={`unfilled_${index}`} className="custom-box-unfilled" />
                )}
            </div>

            <span className="d-block d-sm-none mt-4">{subHeading}</span>
        </div>
    )
}

export default Progresser