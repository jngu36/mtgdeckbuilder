import Dbuser from "../../Model/Dbuser";
import Deck from "../../Model/Deck";
import connectDB from "../lib/connectDB";

export default async function handler(req, res) {
    try {
        const id = req.body.id;

        await connectDB();

        const deck = await Deck.find({_id: id});
        
        deck ?res.status(200).json({deck: deck[0]}) : res.status(500).json({message: "Something went wrong"});

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something wrong happened' })
    }
}
