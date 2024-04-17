import Deck from "../../Model/Deck";
import connectDB from "../lib/connectDB";

export default async function handler(req, res) {
    try {
        const cards = req.body.cards;
        const id = req.body.id;
        const name = req.body.name;
        const description = req.body.description ? req.body.description : "This is a deck. There are many like it but this one is mine.";

        if (cards && id && name) {
            const list = { $set: {cards: cards, name: name, description: description} };
            const condition = { id: id };

            await connectDB();
            await Deck.findOneAndUpdate(condition, list);

            res.status(200).json({ message: "We good!" });
        } else {
            res.status(500).json({ message: "Nope" });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something wrong happened' })
    }
}
