import { Schema, model, models } from "mongoose";

const dbuserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    decks: {
        type: [],
    },
});

const Dbuser = models.Dbuser || model("Dbuser", dbuserSchema);

export default Dbuser;