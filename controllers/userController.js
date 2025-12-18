const userService = require('../services/userService');

async function join(req, res) {
    const {name, password} = req.body;
    console.log('nome que vem do form: ' + name)
    
    try {
        const user = await userService.findUser({name, password});
        req.session.userId = user.id;
        res.redirect('/dashboard');
    } catch (error) {
        res.status(401).send(error.message);
    }
    
}

module.exports = {join};