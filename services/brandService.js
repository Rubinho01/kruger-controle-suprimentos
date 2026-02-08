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

async function findById(id) {
    const brand = brandModel.findByPk(id);
    if(!brand){
        throw new Error("A marca não foi encontrada no banco de dados");
    }
    return brand;
    
}

async function findAll() {
    const brands = await brandModel.findAll();
    if(!brands){
        throw new Error("Nenhuma marca foi encontrada no banco");       
    }
    return brands; 
}


module.exports = {insertBrand, findAll, findById};
