import Dbuser from "../../Model/dbuser";
import connectDB from "../lib/connectDB";
const bcrypt = require('bcryptjs');

export default async function handler(req, res) {
    try {
        const username = req.body.username;
        const id = req.body.id;

        await connectDB();
        const user = await Dbuser.findOne({ username: username});
        
        if (user) {
            user.decks.push(id);
            await user.save();
            res.status(200).json({ message: "Added!" });
        } else {
            res.status(418).json({ message: "Could not find them!" });
        }
    } catch (error) {
        res.status(500).json({ error: 'Something wrong happened' })
    }
}
