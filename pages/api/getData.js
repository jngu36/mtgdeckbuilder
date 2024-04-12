// pages/api/getData.js

import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
    
    

    if (user === 'admin' && pwd === 'test') {
        // Create JWT token
        const token = jwt.sign({ user }, 'secret', { expiresIn: '1h' });
        
        // Return token as response
        res.status(200).json({ data });
    } else {
        res.status(401).json({ error: 'Invalid credentials lol' });
    }
}
