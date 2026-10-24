function Profile() {
    return (
        <div className="author_profile" id="about">

            <div className="round_image">
                <img
                    src="/animated img .png"
                    alt="my image"
                />
            </div>

            <div className="intro">
                <p>I am a full stack web developer</p>
            </div>

            <hr className="center-line" />

            <p className="about_myself">
                Here's what I've done so far
            </p>

        </div>
    );
}

export default Profile;