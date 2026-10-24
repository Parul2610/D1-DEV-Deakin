function Footer() {
    return (
        <footer className="footer">

            <div className="footer-content">

                {/* Explore */}
                <div className="footer-column">
                    <h3>Explore</h3>

                    <a href="#home">Home</a>
                    <a href="#questions">Questions</a>
                    <a href="#articles">Articles</a>
                    <a href="#tutorials">Tutorials</a>
                </div>


                {/* Support */}
                <div className="footer-column">
                    <h3>Support</h3>

                    <a href="#faqs">FAQs</a>
                    <a href="#help">Help</a>
                    <a href="#contact">Contact Us</a>
                </div>


                {/* Stay Connected */}
                <div className="footer-column connected">

                    <h3>Stay connected</h3>

                    <div className="social-icons">

                        <i className="facebook icon"></i>
                        <i className="twitter icon"></i>
                        <i className="instagram icon"></i>

                    </div>

                </div>

            </div>


            {/* Bottom footer */}

            <div className="footer-bottom">

                <h3>DEV@Deakin 2026</h3>

                <div className="footer-bottom-links">
                    <a href="#privacy">Privacy Policy</a>
                    <a href="#terms">Terms</a>
                    <a href="#conduct">Code of Conduct</a>
                </div>

            </div>

        </footer>
    );
}

export default Footer;