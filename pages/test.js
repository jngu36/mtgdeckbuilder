import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import mongoose from "mongoose";
import { useEffect, useState } from "react";

export default function Test() {
    const [msg, setMsg] = useState("Empty");
    const uri = process.env.MONGO;

    if (!uri) {
        console.log("naw");
    } else {
        console.log("okay");
    }

    const cached = global.mongoose;

    if (!cached) {
        cached = global.mongoose = { conn: null, promise: null };
    }

    async function connectDB() {
        if (cached.conn) {
            return cached.conn;
        }

        if (!cached.promise) {
            const opts = {
                bufferCommands: false,
            };

            cached.promise = mongoose.connect(DATABASE_URL, opts).then((mongoose) => {
                return mongoose;
            });
        }
        cached.conn = await cached.promise;
        return cached.conn;
    }

    return (
        <>
            <div>

                <p>{msg}</p>
            </div>
        </>
    );
}
