const fs = require('fs');
const path = require('path');

const express = require('express');
const router = express.Router();

const rootDir = require('../util/path');

router.get('/', (req,res) =>{
    res.sendFile(path.join(rootDir, 'views', 'home.html'));
});

router.get('/users', (req,res)=>{
    res.sendFile(path.join(rootDir, 'views', 'viewUser.html'));
});

router.get('/create',(req,res)=>{
    res.sendFile(path.join(rootDir, 'views', 'createUser.html'));
});

router.post('/add',(req,res)=>{
    let newUser = req.body.userName + '\n';
    fs.appendFile('users.txt', newUser, err => {
        res.redirect('/create');
    });
});

module.exports = router;