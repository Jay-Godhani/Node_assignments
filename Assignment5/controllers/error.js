exports.getError = (req,res) => {
    res.status(404).render('error', {
        pageTitle: 'Page not found',
        path: ''
    });
}