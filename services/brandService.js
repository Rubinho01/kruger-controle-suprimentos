const brandModel = require('../models/brand');

async function insertBrand(name) {

    if(!name || name == ''){
        throw new Error("O nome da empresa deve conter ao menos um caractere");
    }

    const exist = await brandModel.findOne({
        where: { name }
    });
    if(exist){
        throw new Error("Essa empresa já foi cadastrada");
    };
    brandModel.create({
        name: name
    });
    return; 
}

module.exports = {insertBrand};
