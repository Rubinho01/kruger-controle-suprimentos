const { Sequelize } = require('sequelize');
const productModel = require('../models/product');
const brands = require('../models/brand');
const brandService = require('./brandService');
const product = require('../models/product');
const userService = require('./userService');

async function findAllProducts() {
    const products = await productModel.findAll({
        attributes: {
            include: [[
                Sequelize.col('brand.name'),
                'brandName'

            ]]
        },
        include: {
            model: brands,
            as: 'brand',
            attributes:[]
        },
        where: {
            orded: false
        }
    });

    return products;
}

async function formBrandNames() {
    const brands = await brandService.findAll();
    return brands
}

async function insertProduct(name, quantity, brandId, identifier) {
    const brandExist = brandService.findById(brandId);
    if(!brandExist){
        throw new Error("A marca não está cadastrada no sistema");
        
    }
    const userExist = userService.findUserByName(identifier);
    if(!userExist){
        throw new Error("Nome de usuário inválido para criar produto");
    }

    const exist = await productModel.findOne({
        where:{name: name, 
            brandId:brandId}
    });
    if(exist){
        throw new Error("Esse produto já foi cadastrado");   
    }

    if(!name && name===''){
        throw new Error("Digite o nome do produto");
    }

    if(!quantity || quantity===''){
        const product = await productModel.create({
            name, brandId, identifier
        })
    }else{
        const product = await productModel.create({
            name, quantity, brandId, identifier
        })
    }
    return product;
}

async function deleteById(productId) {
    const productExists = productModel.findByPk(productId);
    if(!productExists){
        throw new Error("O produto que você quer excluir não foi encontrado");
    }
    await productModel.destroy({
        where:{
            id: productId
        }
    });
    
}

module.exports = {findAllProducts, formBrandNames, insertProduct, deleteById};