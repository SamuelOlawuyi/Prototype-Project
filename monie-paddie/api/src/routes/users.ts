import express from 'express';
import { createPin,signup } from '../controllers/user';
const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.json({
    message: 'respond with a resource',
    data: '',
  });
});

router.put('/:id', createPin ) 
router.post('/signup', signup)

export default router;
