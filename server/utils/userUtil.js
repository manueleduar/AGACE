const User = require('../db/models/User');

let UserUtil ={
    get: ()=>{
        return User.find() //Saca todos los admin
            .then( users => {
                return users;
            })
            .catch( error => {
                throw Error( error );
            });
    },
    getById: (id) =>{
        return User.findById(id)
        .then(user =>{
                return user;
        })
        .catch( error => {
            throw Error( error );
        });
    },

    delete: (user) => {
        return User.findOneAndDelete(user)
        .then(result =>{
            return  result;
        })
        .catch(err =>{
            throw Error(err);
        })
    }

}

module.exports = UserUtil;