import Dbuser from "../../Model/Dbuser";
const bcrypt = require('bcryptjs');
import connectDB from "../lib/connectDB";

export default async function handler(req, res) {
    try {
        const username = req.body.user;
        const password = req.body.pwd;
        const email = req.body.email;
        
        await connectDB();

        const hash = await bcrypt.hash(password, 10);
        const user = await Dbuser.findOne({ username: username });

        if (user) {
            res.status(418).json({ error: "Already exist!" });
        } else {
            console.log("we in there");
            await Dbuser.create({ username: username, password: hash, email: email });
            res.status(200).json({ message: "User created successfully" })
        }
    } catch (error) {
        res.status(500).json({ error: 'Something wrong happened' })
    }
}
