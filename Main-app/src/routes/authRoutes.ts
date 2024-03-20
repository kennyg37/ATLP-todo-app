import express, { Request, Response } from 'express';
import Auth from "../models/auth"
import bcrypt, { hash } from 'bcrypt';
import exp from 'constants';

const router = express.Router();

router.get('/auth', async (req: Request, res: Response)=> {
    const info = await Auth.find();
    res.json(info);

})
router.get ('/auth/:id', async(req: Request, res: Response)=> {
    const {id} = req.params
    const infoData = await Auth.findById({_id: id});
    res.json(infoData);
})

router.post('/auth', async(req: Request, res:Response)=> {
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

router.put('/auth/:id', async(req: Request, res:Response) => {
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

router.delete('/auth/:id', async (req: Request, res: Response) => {
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
