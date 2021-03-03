const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    switch (url) {
        case '/' : return greetings(res);

        case '/create': return createUser(res);

        case '/add': addUserToFile(req, res);
        break;

        case '/user' : displayUser(res);
        break;
    }
};

//Below function will display greeting message and two buttons for routing to /user and /create page.
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
    return res.end();
}

//Below function will display the /create page.
function createUser(res) {
    res.write('<html>');
    res.write('<head><title>Create</title></head>');
    res.write('<body>');
    res.write('<form method="POST" action="/add">UserName :<input type="text" name="user"><button type="submit">Create</button></form>');
    res.write('<form method="POST" action="/user"><button type="submit">Display User</button></form>');
    res.write('</body>');
    res.write('</html>');
    return res.end();
}

//Below function will display the /user page and list all the users which are created.
function displayUser(res) {
    const readdata = [];
    fs.readFile('user.txt', (err, data) => {
        if (err){ //If file is not present then user is redirected to /create.
            res.statusCode = 302;
            res.setHeader('Location', '/create');
            return res.end();
        }
        readdata.push(data);
        const userString = Buffer.concat(readdata).toString();
        const userArr = userString.split(',');
        userArr.pop(); //pop is used as last element of array after split will be null value.
        if (userArr.length > 0) {   //checking if array is null then file will be empty and user will be redirected to /create
            res.write('<html>');
            res.write('<head><title>User</title></head>');
            res.write('<body>');
            res.write('<h1>All Users are listed below</h1>');
            listUser(userArr);
            res.write('<form method="POST" action="/create"><button type="submit">Create User</button></form>')
            res.write('</body>');
            res.write('</html>');
            return res.end();
        } else {
            res.statusCode = 302;
            res.setHeader('Location', '/create');
            return res.end();
        }
        function listUser(userArr) {
            for (i = 1; i <= userArr.length; i++) {
                res.write(`<h3>${i} :- ${userArr[i - 1]}</h3>`);
            }
        }
    });
}

//Below function will add data which is taken from create page to a user.txt file.
function addUserToFile(req, res) {
    const data = [];
    req.on('data', (datachunk) => {
        data.push(datachunk);
    });
    req.on('end', () => {
        const parseddata = Buffer.concat(data).toString();
        const userName = [];
        userName.push(parseddata.split('=')[1]);
        userName.push("");
        fs.appendFile('user.txt', userName.toString(), (err) => {
            res.statusCode = 302;
            res.setHeader('Location', '/create');
            return res.end();
        });
    });
}

module.exports = requestHandler;