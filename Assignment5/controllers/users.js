const user = require('../models/user');

exports.getAddUser = (req,res)=>{
    res.render('createUser', {
        pageTitle: 'Add User',
        path: '/create'
    });
}

exports.postAddUser = (req,res)=>{
    const username = req.body.userName;
    user.create({
        username: username
    })
    .then(result => {
        res.redirect('/create');
    })
    .catch(err => {
        console.log(err);
    });
}

exports.getUsers =  (req,res)=>{
    user.findAll()
        .then(user =>{
            res.render('viewUser', {
                pageTitle: 'viewUsers',
                path: '/users',
                users: user
            });
        })
        .catch(err =>{
            console.log(err);
        });
}

