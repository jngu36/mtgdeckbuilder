// pages/api/login.js
import jwt from 'jsonwebtoken';

export default function handler(req, res) {
    // Mock user data. In real scenario, validate user credentials against a database.
    const { user, pwd } = req.body;
    
    // Validate user credentials
    if (user === 'admin' && pwd === 'test') {
        // Create JWT token
        //const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const token = jwt.sign({ user }, 'secret', { expiresIn: '1h' });
        
        console.log(token);
        // Return token as response
        res.status(200).json({ token });
    } else {
        res.status(401).json({ error: 'Invalid credentials lol' });
    }
}
