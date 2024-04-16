import User from "@/Model/User";
import connectDb from "../lib/connectDB";

export default async function handler(req, res) {
    try {
        const { user } = req.body
        console.log('CONNECTING TO MONGO');
        await connectDb();
        console.log('CONNECTED TO MONGO');

        console.log('TRYING TO GET SOMETHING');
        const data = await User.findOne({ username: user });
        console.log('FINALLY?');

        res.status(200).json({ data });

    } catch (error) {
        console.log(error);
        res.status(401).json({ error: 'something went bad' });
    }
}