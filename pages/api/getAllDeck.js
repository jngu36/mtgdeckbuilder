import Dbuser from "../../Model/Dbuser";
import Deck from "../../Model/Deck";
import connectDB from "../lib/connectDB";


export default async function handler(req, res) {
    try {
        const username = req.body.username;

        await connectDB();

        const user = await Dbuser.findOne({ username: username });

        if (user.decks.length > 0) {
            const arr = user.decks;
            console.log("ARR", arr);
            const decks = await Deck.find({ _id: { $in: arr } });
            console.log("Decks:", decks);

            decks ? res.status(200).json({ decks: decks }) : res.status(500).json({ message: "Nope" });

        } else {
            res.status(418).json({ message: "no decks!" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something wrong happened' })
    }
}
