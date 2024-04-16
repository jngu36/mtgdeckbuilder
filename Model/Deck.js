import { Schema, model, models } from "mongoose";

const deckSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
    },
    cards: {
        type: [],
    },
});

const Deck = models.Deck || model("Deck", deckSchema);

export default User;