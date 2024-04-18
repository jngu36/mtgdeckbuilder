import { Schema, model, models } from "mongoose";

const deckSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    date: {
        type: Date,
    },
    cards: {
        type: [],
    },
});

const Deck = models.Deck || model("Deck", deckSchema);

export default Deck;