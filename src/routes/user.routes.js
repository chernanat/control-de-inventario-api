const {Router} = require('express');
const {createUser,users} = require('../controller/user.controller')
const router = Router();

router.post('/user', createUser);

router.get('/users', users)


module.exports = router;