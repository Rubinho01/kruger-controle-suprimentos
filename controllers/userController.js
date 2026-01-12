const userService = require('../services/userService');

async function join(req, res) {
    const {name, password} = req.body;
    
    try {
        const user = await userService.findUser({name, password});
        req.session.userId = user.id;
        req.session.userName = user.name;
        res.redirect('/dashboard');
    } catch (error) {
        res.status(401).send(error.message);
    }
    
}

module.exports = {join};