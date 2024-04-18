import Dbuser from '../../Model/Dbuser';
import jwt from 'jsonwebtoken';
import connectDb from "../lib/connectDB";
const bcrypt = require('bcryptjs');

export default async function handler(req, res) {
    try {
        const username = req.body.user;
        const password = req.body.pwd;

        await connectDb();
        
        const user = await Dbuser.findOne({ username: username });

        if (!user) {
            return res.status(401).json({ error: 'No such user' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Password sucks' })
        }

        const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });

    } catch (error) {
        res.status(500).json({ error: 'Error logging in' })
    }
}
