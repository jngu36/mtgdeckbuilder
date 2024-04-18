import Dbuser from "../../Model/Dbuser";
import Deck from "../../Model/Deck";
import connectDB from "../lib/connectDB";


export default async function handler(req, res) {
    try {
        const userName = req.body.username;
        const id = req.body.deckId;

        await connectDB();
        const user = await Dbuser.findOne({ username: userName });

        var arr = user.decks;
        const index = arr.indexOf(id);
        arr.splice(index);

        user.decks = arr;
        user.save();

        await Deck.deleteOne({id: id });

        if (user) {
            res.status(200).json({ message: "No Problems" });
        } else {
            res.status(500).json({ message: "Nope" });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something wrong happened' })
    }
}
