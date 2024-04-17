import { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import jwt from 'jsonwebtoken';
import DeckInfoCard from './components/DeckInfoCard';

export default function Decks() {
    const [message, setMessage] = useState("Hello");
    const [username, setUser] = useState("");
    const [decks, setDecks] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setMessage("Hello, " + jwt.decode(token).user.username);
            setUser(jwt.decode(token).user.username);
        }
    }, []);

    useEffect(() => {
        fetchUser();
    }, [username]);

    const fetchUser = async () => {
        try {
            const res = await fetch('/api/getDeck', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: username }),
            });

            const data = await res.json();

            if (res.ok) {
                setDecks(data.decks);
            }

        } catch (error) {
            console.log("error: ", error);
        }

    }

    const createButton = async () => {

        const token = localStorage.getItem('token');

        if (!token) {
            router.push('/login')
        } else {
            const res = await fetch('/api/createDeck', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });

            const data = await res.json();

            if (res.ok) {
                const id = data.id;

                await fetch('/api/addDeck', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: username, id }),
                });

                //redirect
            }

        }
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <p>{message}</p>
            <button className='btn btn-primary' onClick={createButton}>Create deck!</button>
            <div className='container'>
                <div className='row'>
                    {decks.map((deck) => (
                        <DeckInfoCard name={deck.name} desc={deck.description} id={deck.id}/>
                    ))}
                </div>
            </div>
        </div>
    );
}
