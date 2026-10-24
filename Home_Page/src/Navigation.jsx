
import { Link } from "react-router-dom";

function Navigation() {
    return (
        <div className="Navigation_Bar">
            <nav className="nav_bar">

                <Link to="/" className="nav-brand">
                    DEV@Deakin
                </Link>

                <ul className="nav">
                    <li><a href="/#about">About</a></li>
                    <li><a href="/#work">Work</a></li>
                    <li><a href="/#contact">Contact</a></li>
                </ul>

                <form
                    className="nav-search"
                    onSubmit={(event) => event.preventDefault()}
                >
                    <input
                        type="search"
                        placeholder="Search..."
                        aria-label="Search"
                    />
                </form>

                <div className="nav-actions">
                    <Link to="/postpage" className="nav-post">
                        Post
                    </Link>

                    <Link to="/login" className="nav-login">
                        Login
                    </Link>
                </div>

            </nav>
        </div>
    );
}

export default Navigation;
