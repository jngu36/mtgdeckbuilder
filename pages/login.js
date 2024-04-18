import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
    const [user, setUserName] = useState("");
    const [pwd, setPwd] = useState("");
    const [display, setDisplay] = useState(""); // for error message display
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            router.push("/");
        }
    }, []);

    const submitForm = async (e) => {
        e.preventDefault(); // prevent the browser from automatically submitting the form

        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user, pwd }),
        });

        const data = await res.json();

        if (res.ok) {
            localStorage.setItem('token', data.token); // Store token in local storage  
            router.reload();
        } else {
            setDisplay(data.error);
        }
    }

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundImage: `url(https://wallpapers.com/images/hd/mtg-fight-kvde84ap0c1xc3br.jpg)`, // Background image
            backgroundSize: 'cover',
            backgroundPosition: 'center' // Center the background image
        }}>
            <div style={{
                width: '400px',
                height: '320px',
                padding: '20px',
                border: '1px solid #ccc',
                borderRadius: '10px',
                backgroundColor: '#941221', // Background color of the login square
                color: '#eedcb3', // Text color
                textAlign: 'center' // Center the content horizontally
            }}>
                <form onSubmit={submitForm}>
                    <h1>Log In!</h1>
                    <div className="mb-3">
                        <label htmlFor="user" className="form-label">User</label>
                        <input id="user" className="form-control" value={user} onChange={(e) => setUserName(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="pwd" className="form-label">Password</label>
                        <input type="password" className="form-control" id="pwd" value={pwd} onChange={(e) => setPwd(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
                <a href="signup" style={{ color: '#eedcb3' }}>Sign Up</a>
                <div>{display}</div>
            </div>
        </div>
    );
}
