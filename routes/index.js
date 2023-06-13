var express = require('express');
var router = express.Router();

// import controller
const { MainController } = require('../controllers/MainController');
const { AuthorizationCheck } = require('../lib/AuthorizationCheck')

/* GET home page. */
router.get('/', MainController.mainPage) 
  
/* GET Traditional-game page. */
router.get('/TraditionalGame', MainController.getGameTraditional);

/* login page. */
router.get('/login', MainController.showLoginPage);
router.post('/login', MainController.postLoginPage);

/* register page. */
router.get('/register', MainController.showRegisterPage);
router.post('/register', MainController.postRegisterPage);

/* dashboard page. */
router.get('/dashboard', AuthorizationCheck , MainController.getDashboard);

/* create room page. */
router.get('/createRoom', AuthorizationCheck, MainController.getCreateRoom);
router.post('/createRoom',AuthorizationCheck, MainController.postCreateRoom);

/* joining room page. */
router.get('/joiningRoom', AuthorizationCheck, MainController.getJoiningRoom);

// /* room game page. */
router.get('/roomGame', AuthorizationCheck, MainController.getRoomGame);

/* fight room page. */
router.get('/SuitGame',AuthorizationCheck, MainController.getFightRoom);
// router.post('/SuitGame',AuthorizationCheck, MainController.postFightRoom);



module.exports = router;


// /* logout page. */
// router.post('/logout', AuthorizationCheck, MainController.logout);