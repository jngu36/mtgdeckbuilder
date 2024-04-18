import Deck from "../../Model/Deck";
import mongoose from "mongoose";    

export default async function handler(req, res) {
    try {
        const id = req.body.id;

        await mongoose.connect(process.env.MONGO);

        const deck = await Deck.find({_id: id});
        
        deck ?res.status(200).json({deck: deck[0]}) : res.status(500).json({message: "Something went wrong"});

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something wrong happened' })
    }
}
