import express, { Request, Response } from 'express';
import Auth from "../models/auth"
import bcrypt, { hash } from 'bcrypt';

const router = express.Router();

router.get('/auth/data', async (req: Request, res: Response)=> {
    const info = await Auth.find();
    res.json(info);

})
router.get ('/auth/data/:id', async(req: Request, res: Response)=> {
    const {id} = req.params
    const infoData = await Auth.findById({_id: id});
    res.json(infoData);
})

router.post('/auth/data', async(req: Request, res:Response)=> {
    console.log('Post request made')
    const {username, email, password} = req.body;
    const saltrounds = 10; 
    const hashedPassword = await bcrypt.hash(password, saltrounds);
    const info = new Auth({
        username,
        email,
        password: hashedPassword,
    })
    await info.save();
    res.json(info)

});
router.post('/auth/login', async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        const user = await Auth.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            return res.json({ message: 'Login successful' });
        } else {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

router.put('/auth/data/:id', async(req: Request, res:Response) => {
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

router.delete('/auth/data/:id', async (req: Request, res: Response) => {
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
