import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./Firebase";
import "./Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    async function handleLogin(event) {
        event.preventDefault();
        setMessage("");

        try {
            // Sign in using Firebase Authentication
            await signInWithEmailAndPassword(auth, email, password);

            // Open the homepage after successful login
            navigate("/");
        } catch (error) {
            setMessage("Login failed. Please check your email and password.");
        }
    }

    return (
        <div className="login-container">
            <h2>Login</h2>

            <form onSubmit={handleLogin}>
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                />

                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                />

                <button type="submit">Login</button>
            </form>

            {message && <p className="login-error">{message}</p>}

            <p>
                Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
        </div>
    );
}

export default Login;