import express from 'express';

const router = express.Router();

router.get('/start', (req, res) => {
    res.send('Hejsan this is route calling');
});

export default router;