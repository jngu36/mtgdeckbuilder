import Dbuser from "../../Model/dbuser";
import Deck from "../../Model/Deck";
import connectDB from "../lib/connectDB";

export default async function handler(req, res) {
    try {
        const username = req.body.username;
        const id = req.body.id;

        console.log("data: ", username, id);

        await connectDB();
        const user = await Dbuser.findOne({ username: username });
        const exist = user.decks.includes(id);

        if(exist){
            const deck = await Deck.find({id: id} );
            res.status(200).json({deck: deck[0]});
        }else{
            res.status(500).json({message: "Nope"});
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something wrong happened' })
    }
}
