import Dbuser from "@/Model/Dbuser";
import connectDb from "../lib/connectDB";
const bcrypt = require('bcryptjs');

export default async function handler(req, res) {
    try {
        const username = req.body.user;
        const password = req.body.pwd;
        const email = req.body.email;
        
        const hash = await bcrypt.hash(password, 10);
        await connectDb();

        const number = await Dbuser.countDocuments();

        const user = await Dbuser.findOne({ username: username });
        
        if (user) {
            res.status(418).json({ error: "Already exist!" });
        } else {
            const newUser = await Dbuser.create({ id: number+1,username, password: hash, email })
            res.status(200).json({ message: "User created successfully" })
        }
    } catch (error) {
        res.status(500).json({ error: 'Something wrong happened' })
    }
}
