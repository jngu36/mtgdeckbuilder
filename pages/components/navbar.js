import React, { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import Link from 'next/link';
import jwt from 'jsonwebtoken';

export default function Navbar() {
    const [login_text, setLoginText] = useState("Login");
    const [button_class, setButtonClass] = useState("");
    const [logged, setLoggedIn] = useState(false);
    const [message, setMessage] = useState("");
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setMessage("Hello, " + jwt.decode(token).user.username);
        }
        setLoggedIn(true);
        setButtonClass("btn " + (token ? "btn-danger" : "btn-primary"));
        token ? setLoginText("Logout") : setLoginText("Login");
        
    }, []);

    const log_form = async (e) => {
        e.preventDefault(); // Prevent form submission
        if (localStorage.getItem('token')) {
            localStorage.removeItem('token');
            router.push('/');
        } else {
            router.push('/login');
        }
    };

    return (
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#941221' }}>
            <div className="container-fluid">
                <Link href="/" className="navbar-brand" style={{ color: '#eedcb3' }}>MTG Deck Builder</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>

                    {!logged ? <Link href="/signup">
                        <button className="btn btn-secondary" style={{ marginRight: '10px', backgroundColor: '#eedcb3', color: '#941221' }}>Create Account</button>
                    </Link> : <p>{message}</p>
                    }

                    <form onSubmit={log_form}>
                        <button className={button_class} type="submit" style={{ marginLeft: '10px', backgroundColor: '#eedcb3', color: '#941221' }}>{login_text}</button>
                    </form>
                </div>
            </div>
        </nav>
    );
}
