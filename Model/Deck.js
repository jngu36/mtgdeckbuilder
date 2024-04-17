import { Schema, model, models } from "mongoose";

const deckSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
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

export default Deck;