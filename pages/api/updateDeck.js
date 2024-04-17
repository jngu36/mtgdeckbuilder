import Deck from "../../Model/Deck";
import connectDB from "../lib/connectDB";

export default async function handler(req, res) {
    try {
        const list = { cards: req.body.cards };
        const condition = { id: req.body.id };

        await connectDB();
        const user = await Deck.findOneAndUpdate(condition, list);
        
        if(user){
            res.status(200).json({message: "We good!"});
        }else{
            res.status(500).json({message: "Nope"});
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something wrong happened' })
    }
}
