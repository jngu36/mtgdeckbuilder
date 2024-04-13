import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import { useState } from "react";


export default function Test() {
    const [msg, setMsg] = useState("");

    const handled = async (e) => {
        console.log("whoa 1")
        const res = await fetch('./api/getData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((res)=>res.json())
        .then((data)=>{
            f
        });
    }
    return (
        <>
            <div>
                <button onClick={handled}>Whoa</button>
                <p>{msg}</p>
            </div>
        </>
    );
}
