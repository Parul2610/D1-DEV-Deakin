function Gallery() {

    const photos = [
        "/Photo 1.jpg",
        "/Photo 2.jpg",
        "/Photo 3.jpg",
        "/Photo 4.jpg",
        "/Photo 5.jpg",
        "/Photo 6.jpg",
        "/Photo 8.jpg",
        "/Photo 9.jpg",
        "/Photo 10.jpg",
        "/Photo 11.jpg",
        "/Photo 12.jpg",
        "/Photo 13.jpg"
    ];

    return (
        <section className="gallery_section" id="gallery">

            <div className="My_photos">
                <hr className="center-line" />
                <p>My photos</p>
            </div>

            <div className="pinterest_gallery">

                {photos.map((photo, index) => (
                    <img
                        key={index}
                        src={photo}
                        alt={`Photo ${index + 1}`}
                    />
                ))}

            </div>

        </section>
    );
}

export default Gallery;