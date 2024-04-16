import { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import jwt from 'jsonwebtoken';

export default function Home() {
    const [message, setMessage] = useState("Hello");
    const [data, setData] = useState("");
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            setMessage("Hello, " + jwt.decode(token).user.username);
        }

        

    }, []);

    const createButton = async () => {
        const token = localStorage.getItem('token');

        if (!token) {
            router.push('/login')
        } else {
            const user = jwt.decode(token).user;
            console.log(user.username);
            console.log(user.id);

            const res = await fetch('/api/createDeck', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });

            const data = await res.json();
            console.log(data);

            if (res.ok) {

                const username = user.username;
                const id = data.id;

                await fetch('/api/addDeck', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, id }),
                });
            }

        }
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <p>{message}</p>
            <p>{data}</p>
            <button className='btn btn-primary' onClick={createButton}>Create deck!</button>
        </div>
    );
}
