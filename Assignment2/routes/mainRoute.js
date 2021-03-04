const fs = require('fs');

const express = require('express');

const router = express.Router();

//This will handel get request for 'localhost:3000/'
router.get('/', (req,res)=>{
    greetings(res);
});

//This will handel post request for 'localhost:3000/create'
router.post('/create', (req,res)=>{
    createUser(res);
});

//This will handel post request for 'localhost:3000/add'
router.post('/add', (req,res)=>{
    let newUser = req.body.user + '\n'; // Getting user input with help of body-parser module.
    //adding user to users.txt file if file is not present it will create a new file named users.txt and then add the newUser data.
    fs.appendFile('users.txt', newUser, err =>{
        res.redirect(307 ,'/create');
    });
})

//This will handel post request for 'localhost:3000/user'
router.post('/user', (req,res)=>{
    displayUser(res);
});

//Function for displaying users list
function displayUser(res) {
    //checking that users.txt file exist 
    if (fs.existsSync('users.txt')) {
        let data = fs.readFileSync('users.txt', 'utf-8');
        if (data.length === 0) {    // If users.txt file is empty it will be redirected to /create
            res.redirect(307, '/create');
        }
        data = data.split('\n');
        data.pop();
        res.write('<html>');
        res.write('<head><title>User</title></head>');
        res.write('<body>');
        res.write('<h1>All Users are listed below</h1>');
        res.write('<h3><ul>');
        listUser(data);
        res.write('</ul></h3>');
        res.write('<form method="POST" action="/create"><button type="submit">Create User</button></form>');
        res.write('</body>');
        res.write('</html>');
        res.end();
        //function which will list all the users in data array
        function listUser(data) {
            for (const item of data) {
                res.write(`<li>${item}</li>`);
            }
        }
    }
    else {
        res.redirect(307, '/create');
    }
}

//Function to create a form which collect user data
function createUser(res) {
    res.write('<html>');
    res.write('<head><title>Create</title></head>');
    res.write('<body>');
    res.write('<form method="POST" action="/add">UserName :<input type="text" name="user"><button type="submit">Create</button></form>');
    res.write('<form method="POST" action="/user"><button type="submit">Display User</button></form>');
    res.write('</body>');
    res.write('</html>');
    res.end();
}

//Function which will create greet page
function greetings(res) {
    res.write('<html>');
    res.write('<head><title>Greetings</title></head>');
    res.write('<body>');
    res.write('<h1>Welcome to my new page, how are You?</h1>');
    res.write('<h3>If no users are present it will be redirected to create user.</h3>');
    res.write('<form method="POST" action="/user"><button type="submit">Display User</button></form>');
    res.write('<form method="POST" action="/create"><button type="submit">Create User</button></form>');
    res.write('</body>');
    res.write('</html>');
    res.end();
}

module.exports = router;