import "../styles/Footer.css";
import { Link } from "react-router-dom";

import {  FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="footer">

            <div className="footer-container">

                {/* LEFT */}
                <div className="footer-brand">
                    <img
                        src="/images/maahi-logo.png"
                        alt="Maahi Music Logo"
                        className="nav-logo"
                    />
                    <h2>Maahi Music</h2>
                    <p>Stream your favourite songs anytime, anywhere.</p>
                </div>

                {/* CENTER */}
                <div className="footer-links">
                    <h4>Quick Links</h4>
                    <Link to="/">Home</Link>
                    <Link to="/playlists">Playlists</Link>
                    <Link to="/login">Login</Link>

                </div>

                {/* RIGHT */}
                <div className="footer-social">
                    <h4>Connect</h4>
                    <div className="social-icons">
                        <FaInstagram />
                        <FaGithub />
                        <FaLinkedin />
                    </div>
                </div>

            </div>

            <div className="footer-bottom">
                © {new Date().getFullYear()} Maahi Music Library. All Rights Reserved.
            </div>

        </footer>
    );
}
