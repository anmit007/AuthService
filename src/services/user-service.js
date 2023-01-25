const jwt = require('jsonwebtoken');
const UserRepository = require('../repository/user-repository');
const {JWT_KEY} = require('../config/server-config');
const bcrypt = require('bcrypt');
class UserService{

    constructor ()
    {
        this.UserRepository = new UserRepository();
    }

    async create(data)
    {
        try {
            const user = await this.UserRepository.create(data);
            return user
        } catch (error) {
            console.log("something went wrong in service layer");
            throw error;
        }
    }
    async signin(email,plainPassword)
    {
        try {
            //fetch the user email
            const user = await this.UserRepository.getbyEmail(email);
            // compare incomming plain password with stored encrypted password
            const passwordMatch = this.checkPassword(plainPassword,user.password);
            if(!passwordMatch)
            {
                console.log("incorrect password");
                throw({error : 'password incorrect'});
            }
            // if passwords match , create a token and send it to the user
            const newJWT = this.createToken({email : user.email, id:user.id});
            return newJWT;

        } catch (error) {
            console.log("something went wrong in signin process");
            throw error;
        }
    }
    async isAuthenticated(token)
    {
        try {
            const isVerified = this.verifyToken(token);
            if(!isVerified){
                throw{error : 'invalid token'}
            }
            const user = await this.UserRepository.getById(isVerified.id);
            if(!user)
            {
                throw {error : 'no user with corresponding token exists'};
            }
            return user.id ;
        } catch (error) {
            console.log("something went wrong in Auth process");
            throw error;
        }
    }
    createToken(user)
    {
        try {
            const result = jwt.sign(user,JWT_KEY,{expiresIn : '1d'});
            return result;
        } catch (error) {
            console.log("something went wrong in token creation  layer");
            throw error;
        }

    }
    verifyToken(token)
    {
        try {
            const response = jwt.verify(token,JWT_KEY);
            return response;
        } catch (error) {
            console.log("something went wrong in verifytoken",error);
            throw error;
        }
    }

    checkPassword(userInputplainPassword,encryptedPassword)
    {
        try {
            return bcrypt.compareSync(userInputplainPassword,encryptedPassword);
        } catch (error) {
            console.log('something went wrong in password comparison');
            throw error ;
        }
    }
}
module.exports = UserService;