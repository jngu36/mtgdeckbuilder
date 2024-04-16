import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {

    const [user, setUserName] = useState("");
    const [pwd, setPwd] = useState("");
    const [display, setDisplay] = useState(""); //for debug purposes
    const router = useRouter();

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
            router.push('/');
        } else {
            setDisplay(data.error);
        }
    }

    return (
        <>
            <div>
                <form onSubmit={submitForm} style={{ width: "500px" }}>
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
                <div>{display}</div>
            </div>
        </>
    );
}
