import React, { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import Link from 'next/link';

export default function Navbar() {
    const [login_text, setLoginText] = useState("Login");
    const [button_class, setButtonClass] = useState("");
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
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
        <nav className="navbar navbar-expand-lg" style={{backgroundColor:'#941221'}}>
            <div className="container-fluid">
                <p className="navbar-brand" style={{ color: '#eedcb3', fontFamily: 'Papyrus' }}>MTG Deck Builder</p>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
                    <Link href="/signup">
                        <button className="btn btn-secondary" style={{ marginRight: '10px' }}>Create Account</button>
                    </Link>
                    :
                    <form onSubmit={log_form}>
                        <button className={button_class} type="submit" style={{ marginLeft: '10px' }}>{login_text}</button>
                    </form>
                </div>
            </div>
        </nav>
    );
}
