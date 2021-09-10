var Userdb = require('../model/model');

//create and save new users
exports.createUser = (req, res) => {
    //validate request
    if(!req.body)
    {
        res.status(404);
        res.send({message: 'content can not be empty'});
    }
    //new user
    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status,
    });

    //save user in database
    user
    .save(user).then((data) => {
        req.send(data);
    }).catch((err) => {
        req.status(500);
        req.send({message: err.message || "some error occurred while creating a creat operation"});
    });
}

//retrieve and update all users/retrieve and return a single users
exports.find = (req, res) =>{
    Userdb.find()
    .then(users =>{
        res.send(users);
    }).catch(err =>{
        res.status(500).send({message: err.message || 'Error Occurred While Retriving the user data'});
    })
}

//update a new identified user by user id
exports.update = (req, res) =>{
    if(!req.body){
        return res
        .status(400)
        .send({message: 'Data to update can not be empty'});
    }
    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body,{useFindAndModify: false})
    .then((data) =>{
        if(!data){
            res.status(404).send({message:'Cannot update user with ${id}. may be data not found'});
        }
        else{
            res.send(data);
        }
    }).catch((err) =>{
        res.status(500).send({message:'error update user information'});
    })
}

//delete a user with a specified user id in the request 
exports.delete = (req, res) =>{
    const id = req.params.id;
    Userdb.findByIdAndDelete(id).then(data =>{
        if(!data){
            res.status(404).send({message:'Cannot delete user with ${id}. may be data not found'});
        }
        else{
            res.send(data);
        }
    }).catch(err =>{
        res.status(500).send({message:'Cannot delete user with ${id}'});
    })
}
