const CollectionImages = ({ images }) => {
    return (
        <section className="collection-images">
            {Array.from(Array(6).keys()).map(index => images[index] === undefined ?
                undefined :
                <img
                    key={`collection_image_${index}`}
                    src={images[index]}
                />
            )}
        </section>
    )
}

export default CollectionImages