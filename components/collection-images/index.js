const CollectionImages = ({ images }) => {
    return (
        <section className="collection-images">
            {Array.from(Array(6).keys()).map(index => images[index] === undefined ?
                undefined :
                <img
                    key={`collection_image_${images[index].single_image.url}${index}`}
                    src={images[index].single_image.url}
                />
            )}
        </section>
    )
}

export default CollectionImages