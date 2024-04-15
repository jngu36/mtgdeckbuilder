import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import { useRouter } from 'next/router';
import { useEffect } from "react";

export default function Login() {
    const router = useRouter();

    useEffect(() => {
        localStorage.clear();
        router.push('/');
    },[]);

    return (
        <>
            <div>
                <p>Loser</p>
            </div>
        </>
    );
}
