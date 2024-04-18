import Deck from "../../Model/Deck";

export default async function handler(req, res) {
    try {
        const cards = req.body.cards;
        const id = req.body.id;
        const name = req.body.name;
        const description = req.body.description ? req.body.description : "This is a deck. There are many like it but this one is mine.";

        if (cards && id && name) {
            const list = { $set: {cards: cards, name: name, description: description} };
            const condition = { _id: id };

            await connectDB();
            await Deck.findOneAndUpdate(condition, list);

            res.status(200).json({ message: "Deck saved!" });
        } else {
            res.status(500).json({ message: "We have no idea what went wrong." });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something wrong happened' })
    }
}
