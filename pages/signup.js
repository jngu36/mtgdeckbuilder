import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {

    const [user, setUserName] = useState("");
    const [pwd, setPwd] = useState("");
    const [email, setEmail] = useState("");

    const [err_msg_1, SetError1] = useState("");
    const [err_msg_2, SetError2] = useState("");
    const [err_msg_3, SetError3] = useState("");

    const [success, setSuccess] = useState("");

    const router = useRouter();

    const submitForm = async (e) => {

        e.preventDefault(); // prevent the browser from automatically submitting the form

        !user ? SetError1(" - Please input a user name.") : SetError1("");
        !pwd ? SetError2("- Please input a password.") : SetError2("");
        !email ? SetError3(" - Please input a email.") : SetError3("");

        if (user && pwd && email) {

            const res = await fetch('/api/createAccount', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, user, pwd}),
            });

            if (res.ok) {
                setSuccess("Create successful! Redirecting to home page really soon...");
                setTimeout(() => {
                    router.push('/');
                }, 3000);
            }else{
                console.log("Nope");
            }
        }
    }

    return (
        <>
            <div style={{ marginLeft: "35%", marginRight: "35%" }}>
                <form onSubmit={submitForm} style={{ width: "500px" }}>
                    <div className="mb-3">
                        <label htmlFor="user" className="form-label">User <span style={{ color: "red" }}>{err_msg_1}</span></label>
                        <input id="user" className="form-control" value={user} onChange={(e) => setUserName(e.target.value)} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="pwd" className="form-label">Password <span style={{ color: "red" }}>{err_msg_2}</span></label>
                        <input type="password" className="form-control" id="pwd" value={pwd} onChange={(e) => setPwd(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email <span style={{ color: "red" }}>{err_msg_3}</span></label>
                        <input className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary">Create Account!</button>
                </form>

                <div style={{ color: "green", fontWeight: "bold" }}><br />{success}</div>
            </div>
        </>
    );
}
