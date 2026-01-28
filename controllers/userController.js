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

async function logout(req,res) {
    if(!req.session.userId  || !req.session.userName){
        throw new Error("O usuário deve estar logado para sair");
    }
    try {
        req.session.destroy((err)=>{
            if(err) res.status(500).send("Erro ao destruir sessão");
        });
        res.redirect('/login')
    } catch (error) {
        res.status(401).send(error.message)
    }
    
}

module.exports = {join, logout};