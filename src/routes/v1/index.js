const express = require('express');

const UserController = require('../../controllers/user-controller');
const {AuthRequestvalidator} = require('../../middlewares/index');

const router = express.Router();

router.post(
    '/signup', 
    AuthRequestvalidator.validateUserAuth,
    UserController.create
);
router.post(
    '/signin',
    AuthRequestvalidator.validateUserAuth,
    UserController.signIn
)

router.get(
    '/isAuthenticated',
    UserController.isAuthenticated,

)
router.get(
    '/dummy',(req,res) =>{
        return res.status(200).json({message:'OK'});
    }
   
    
)

module.exports = router;