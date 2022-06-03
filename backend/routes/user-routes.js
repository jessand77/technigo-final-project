import express from 'express';

const router = express.Router();

router.get('/userroutern', (req, res) => {
	res.send('Hejsan this is user route calling');
});

export default router;
