import Dbuser from "@/Model/Dbuser";
import Deck from "@/Model/Deck";
import connectDB from "../lib/connectDB";

export default async function handler(req, res) {
    try {
        const username = req.body.username;
        const id = req.body.id;

        await connectDB();
        const user = await Dbuser.findOne({ username: username });
        const exist = user.decks.includes(id);

        if(exist){
            const deck = await Deck.find({id: id} );

            //update
            
            

            res.status(200).json({message: "We good!"});
        }else{
            res.status(500).json({message: "Nope"});
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something wrong happened' })
    }
}
