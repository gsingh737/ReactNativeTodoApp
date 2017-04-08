const passport = require('passport');
const AuthenticationController = require('../controllers/authentication_controller');
const TodosController = require('../controllers/todos_controller');
const passportService = require('./passport');

const requireAuth = passport.authenticate('jwt', {session: false});
const requireLogin = passport.authenticate('local', {session: false});
const router = require('express').Router();

function protected(req, res, next) {
    res.send('Heres the secret');
}

router.get('/protected', requireAuth, protected);
//auth routes
router.post('/signup', AuthenticationController.signup);
router.post('/signin', requireLogin, AuthenticationController.signin);
//todos routes
router.get('/users/:user_id/todos', requireAuth, TodosController.index);
router.post('/users/:user_id/todos', requireAuth, TodosController.create);
router.delete('/users/:user_id/todo/:todo_id', requireAuth, TodosController.destroy);

module.exports = router;

