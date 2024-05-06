import express, { Request, Response } from 'express';
import Auth from "../models/auth"
import bcrypt, { hash } from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

/**
 * @swagger
 * /auth/data:
 *   get:
 *     summary: Get user data
 *     responses:
 *       200:
 *         description: A list of user data
 *       404:
 *         description: User data not found
 */

router.get('/data', async (req: Request, res: Response)=> {
    const info = await Auth.find();
    res.json(info);

})

/**
 * @swagger
 * /auth/data:
 *   get:
 *     summary: Get user data by id
 *     responses:
 *       200:
 *         description: A list of user data by id
 *       404:
 *         description: User data not found
 */

router.get ('/data/:id', async(req: Request, res: Response)=> {
    const {id} = req.params
    const infoData = await Auth.findById({_id: id});
    res.json(infoData);
})

/**
 * @swagger
 * /auth/data:
 *   post:
 *     summary: add user
 *     responses:
 *       200:
 *         description: User data added successfully
 *       404:
 *         description: couldn't add user data
 */

router.post('/data', async(req: Request, res:Response)=> {
    console.log('Post request made')
    const {username, email, password} = req.body;
    const saltrounds = 10; 
    let hashedPassword;
    try {
        hashedPassword = await hash(password, saltrounds);
    } catch (error) {
        res.json({message: 'Password is required'})
    }
    const confirmPassword = password;
    const info = new Auth({
        username,
        email,
        password: hashedPassword,
        confirmPassword: hashedPassword,
    })
    if (password !== confirmPassword) {
        res.json({message: 'Passwords do not match'})        
    } else {
        await info.save();
        res.json(info);
    }

});

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: login
 *     responses:
 *       200:
 *         description: login successful
 *       404:
 *         description: Invalid username or password
 */

router.post('/login', async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        const user = await Auth.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            const token = jwt.sign({ id: user._id, username: user.username }, 'your_secret_key', { expiresIn: '1h' });
            return res.json({ message: 'Login successful', token });
        } else {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});
/**
 * @swagger
 * /auth/data:
 *   put:
 *     summary: modify user data
 *     responses:
 *       200:
 *         description: User data modified successfully
 *       404:
 *         description: User data not found
 */

router.put('/data/:id', async(req: Request, res:Response) => {
    const{id} = req.params;
    const {username, email, password} = req.body;
    const saltrounds = 10;
    let updateData: any = { username, email };

    if (password) {
        updateData.password = await bcrypt.hash(password, saltrounds);
    }

    try {
        const info = await Auth.findByIdAndUpdate({_id: id}, updateData, { new: true });

        if (!info) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(info);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
})
/**
 * @swagger
 * /auth/data:
 *   delete:
 *     summary: delete user
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */

router.delete('/data/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const info = await Auth.findByIdAndDelete(id);

        if (!info) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});


export default router;
