const fs = require('fs');

const express = require('express');
const router = express.Router();

router.get('/users', (req,res,next)=>{
    if (fs.existsSync('users.txt')) {
        let data = fs.readFileSync('users.txt', 'utf-8');
        data = data.split('\n');
        data.pop();
        res.render('index', {pageTitle : 'Users', users : data});
    }
    else {
        const data = [];
        res.render('index' , {pageTitle : 'Users', users : data});
    }
});

router.get('/',(req,res,next)=>{
    res.render('users', {pageTitle : 'Add Users'});
});

router.post('/add',(req,res)=>{
    let newUser = req.body.name + '\n';
    fs.appendFile('users.txt', newUser, err => {
        res.redirect('/');
    });
});

module.exports = router;