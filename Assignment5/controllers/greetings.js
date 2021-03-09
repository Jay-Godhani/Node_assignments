exports.getGreeting = (req,res) =>{
    res.render('home', {
        pageTitle: 'Greetings...',
        path: '/'
    });
}