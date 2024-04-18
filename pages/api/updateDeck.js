import Deck from "../../Model/Deck";

export default async function handler(req, res) {
    try {
        const cards = req.body.cards;
        const id = req.body.id;
        const name = req.body.name;
        const description = req.body.description ? req.body.description : "This is a deck. There are many like it but this one is mine.";

        if (cards && id && name) {
            const change = { $set: {cards: cards, name: name, description: description} };
            const find = { _id: id };

            await mongoose.connect(process.env.MONGO);

            const res = await Deck.findOneAndUpdate(find, change);

            console.log(res);

            res.status(200).json({ message: "Deck saved!" });
        } else {
            res.status(500).json({ message: "We have no idea what went wrong." });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something wrong happened' })
    }
}
