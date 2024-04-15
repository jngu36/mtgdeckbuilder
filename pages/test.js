import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import { useState } from "react";
const bcrypt = require('bcryptjs');


export default function Test() {
    const [msg, setMsg] = useState("");
    let user_item;
    const handled = async (e) => {

        const give_user = "john";
        const res = await fetch('./api/getData', {
            method: 'POST',
            body: JSON.stringify({user: give_user}),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((res)=>res.json())
        .then(async (obj)=>{
            if(obj.data){
                const match = await bcrypt.compare("password", obj.data.password);
                match ? console.log("works") : console.log("naw");
            }else{
                console.log("no data")
            }

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
