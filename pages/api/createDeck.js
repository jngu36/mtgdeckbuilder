import Deck from "@/Model/Deck";
import connectDB from "../lib/connectDB";

export default async function handler(req, res) {
    try {

        await connectDB()

        let number = await Deck.countDocuments();
        number = number + 1;
        const name = "Untitled Deck"; //replace with given
        const description = "Generic description of a deck"; //replace with given
        const date = new Date();

        const newDeck = await Deck.create({ 
            id: number,
            name: name,
            description: "New deck description",
            date: date,
        });

        res.status(200).json({ id: newDeck.id })

    } catch (error) {
        //console.log(error);
        res.status(500).json({ error: 'Something wrong happened' })
    }
}
