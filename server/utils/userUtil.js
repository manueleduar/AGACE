const User = require('../db/models/User');

let UserUtil ={
    getById: (id) =>{
        return User.findById(id)
        .then(user =>{
                return user;
        })
        .catch( error => {
            throw Error( error );
        });
    }



}

module.exports = UserUtil;