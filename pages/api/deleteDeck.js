import Dbuser from "../../Model/Dbuser";
import Deck from "../../Model/Deck";
import connectDB from "../lib/connectDB";


export default async function handler(req, res) {
    try {
        const userName = req.body.username;
        const id = req.body.id;

        await connectDB();
        const user = await Dbuser.findOne({ username: userName });

        var arr = user.decks;
        const index = arr.indexOf(id);
        arr.splice(index, 1);
        
        user.decks = arr;
        user.save();

        await Deck.deleteOne({_id: id });

        res.status(200).json({ message: "No Problems" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something wrong happened' })
    }
}
