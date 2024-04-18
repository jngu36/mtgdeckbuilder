import React, { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import Link from 'next/link';
import jwt from 'jsonwebtoken';

export default function Navbar() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [message, setMessage] = useState("");
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwt.decode(token);
            if (decodedToken) {
                setMessage(`Hello, ${decodedToken.user.username}`);
                setLoggedIn(true);
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.reload();
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

                    <div style={{ display: 'flex', alignItems: 'center' }}> {/* Flex container for Hello, User and Login Button */}
                        <div style={{ color: '#eedcb3', marginRight: '10px' }}>{message}</div> {/* Flex item for Hello, User */}
                        {loggedIn ? (
                            <button
                                className="btn btn-primary"
                                onClick={handleLogout}
                                style={{ backgroundColor: '#eedcb3', color: '#941221' }}
                            >
                                Logout
                            </button>
                        ) : (
                            <Link href="/login">
                                <button className="btn btn-primary" style={{ backgroundColor: '#eedcb3', color: '#941221' }}>Login</button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
