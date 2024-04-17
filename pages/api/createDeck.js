import Deck from "@/Model/Deck";
import connectDB from "../lib/connectDB";

export default async function handler(req, res) {
    try {

        await connectDB()

        let number = await Deck.countDocuments();
        number = number + 1;
        console.log(number);
        const name = "New deck";
        const date = new Date();

        const newDeck = await Deck.create({ 
            id: number,
            name: name,
            date: date,
        });

        res.status(200).json({ id: newDeck.id })

    } catch (error) {
        //console.log(error);
        res.status(500).json({ error: 'Something wrong happened' })
    }
}
