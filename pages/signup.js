import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import { useState } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { useRouter } from 'next/router';

export default function Signup() {

    const [user, setUserName] = useState("");
    const [pwd, setPwd] = useState("");
    const [display, setDisplay] = useState(""); //for debug purposes
    const router = useRouter();

    const submitForm = async (e) => {
        e.preventDefault(); // prevent the browser from automatically submitting the form

        /*
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user, pwd }),
        });
        
        const data = await res.json();

        if(res.ok){
            localStorage.setItem('token', data.token); // Store token in local storage
            router.push('/');
        }else{
            setDisplay(data.error);
        }
        */
    }

    return (
        <>
            <div>
                <form onSubmit={submitForm} style={{ width: "500px" }}>
                    <div class="mb-3">
                        <label htmlFor="user" class="form-label">User</label>
                        <input id="user" className="form-control" value={user} onChange={(e) => setUserName(e.target.value)} />
                    </div>
                    <div class="mb-3">
                        <label htmlFor="pwd" class="form-label">Password</label>
                        <input type="password" class="form-control" id="pwd" value={pwd} onChange={(e) => setPwd(e.target.value)} />
                    </div>
                    <button type="submit" class="btn btn-primary">Create</button>
                    <div style={{ color: "red" }}>{display}</div>
                </form>
            </div>
        </>
    );
}
