import Dbuser from "@/Model/Dbuser";
import Deck from "@/Model/Deck";
import connectDB from "../lib/connectDB";

export default async function handler(req, res) {
    try {
        const username = req.body.username;

        await connectDB();
        const user = await Dbuser.findOne({ username: username });

        var arr = [];

        user.decks.forEach((element)=>{
            arr.push(element);
        });

        console.log("finding with ", arr);
        const decks = await Deck.find({id: { $in: arr } } );

        if (user) {
            res.status(200).json({decks: decks});
        }else{
            res.status(500).json({message: "Nope"});
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something wrong happened' })
    }
}
