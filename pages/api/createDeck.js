import Deck from "@/Model/Deck";
import connectDB from "../lib/connectDB";

export default async function handler(req, res) {
    try {
        let number = await Deck.countDocuments();
        number = number + 1;
        const name = "New deck";
        const date = new Date();

        const newDeck = await Deck.create({ 
            number,
            name,
            date,
        });

        res.status(200).json({ id: newDeck.id })

    } catch (error) {
        //console.log(error);
        res.status(500).json({ error: 'Something wrong happened' })
    }
}
