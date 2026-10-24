import { useState } from 'react';

function Subscribe() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage('Sending...');

        try {
            const response = await fetch('/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const result = await response.text();

            if (response.ok) {
                setMessage(result);
                setEmail('');
            } else {
                setMessage(result || 'Subscription failed. Please try again.');
            }
        } catch (error) {
            console.error('Subscription error:', error);
            setMessage('Unable to connect to the server. Please try again.');
        }
    };

    return (
        <div className="subscribe" id="contact">

            <h2>SIGN UP FOR OUR DAILY INSIDER</h2>


            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                />
                <button type="submit">Subscribe</button>
            </form>

            <p>{message}</p>


        </div>
    );
}

export default Subscribe;