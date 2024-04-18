import Deck from "../../Model/Deck";
import connectDB from "../lib/connectDB";

export default async function handler(req, res) {
    try {
        const name = "Untitled Deck";
        const description = "Generic description of a deck";
        const date = new Date();

        await connectDB()

        console.log("attempting to creae");

        const newDeck = await Deck.create({ name: name, description: description, date: date});
        
        res.status(200).json({ id: newDeck._id })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something wrong happened' })
    }
}
