import express from 'express'
import db from './db.js'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import razorpay from './razorpay.js'

import cartRoutes from './cartRoutes.js'
import Razorpay from 'razorpay'

const app = express();
app.use(express.json({strict:false}));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

const secret = "Secret_Key";

app.get('/users', async (req, res) => {
    const [rows] = await db.execute('SELECT * FROM reg_user');
    console.log(rows);
    res.json(rows);
});

app.post('/users', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await db.execute(
            `INSERT INTO reg_user(name, email, password) VALUES (?, ?, ?)`,
            [name, email, hashedPassword]
        );
        console.log(result);
        res.status(201).json({ message: 'user created', userId: result.insertId });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.post('/login', async (req, res) => {
    const { name, password } = req.body;
    console.log(req);
    try {
        const [row] = await db.execute("SELECT * FROM reg_user WHERE name = ?", [name]);
        // console.log(row);
        if (row.length === 0) {
            return res.status(401).json({ status: 1, msg: "user not found" });
        }
        const user = row[0];
        const isMatched = await bcrypt.compare(password, user.password);
        if (!isMatched) {
            return res.status(401).json({ msg: "incorrect password" });
        }

        // console.log(user);
        const accessToken = jwt.sign({ email: user.email , name: user.name }, secret, { expiresIn: '1h' });
    
        console.log(accessToken);
        return res.status(200).json({ msg: "Login successful", accessToken });
    } catch (err) {
        return res.status(500).json({ error: "Login failed", detail: err.message });
    }
});



app.use('/', cartRoutes);
app.use('/api', razorpay)



app.listen(8000, () => {
    console.log('server running on http://localhost:8000');
});
