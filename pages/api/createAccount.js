import User from "@/Model/User";
import connectDb from "../lib/connectDB";
const bcrypt = require('bcryptjs');

export default async function handler(req, res) {
    try {
        const username = req.body.user;
        const password = req.body.pwd;
        const email = req.body.email;
        
        const hash = await bcrypt.hash(password, 10);
        await connectDb();

        const user = await User.findOne({ username: username });
        
        if (user) {
            res.status(418).json({ error: "Already exist!" });
        } else {
            const newUser = await User.create({ email, username, password: hash })
            res.status(200).json({ message: "User created successfully" })
        }
    } catch (error) {
        res.status(500).json({ error: 'Something wrong happened' })
    }
}
