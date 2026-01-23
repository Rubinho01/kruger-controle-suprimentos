const userModel = require('../models/user');
const bcrypt = require('bcrypt');


async function findUser({ name, password }) {
    const user = await userModel.findOne({
        where: { name }
    });

    if (!user) {
        throw new Error("Usuário não encontrado");
    }

    const passwordDecrypt = await bcrypt.compare(password, user.password);

    if (!passwordDecrypt) {
        throw new Error("Senha incorreta");
    }

    return user;
}

async function findUserByName(userName) {
    const user = await userModel.findOne({
        where:{name: userName}
    })
    if(!user){
        throw new Error("usuário não encontrado com esse nome");
    }

    return user;
    
}


module.exports = {findUser, findUserByName};