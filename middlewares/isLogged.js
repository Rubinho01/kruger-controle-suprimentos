function isLoggedMiddleware(req, res, next) {
    if(!req.session.userId || !req.session.userName){
        return res.redirect('/login');
    }else{
        return next();
    }
    
}

module.exports = isLoggedMiddleware;