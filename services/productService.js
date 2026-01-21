const { Sequelize } = require('sequelize');
const productModel = require('../models/product');
const brands = require('../models/brand');
const brandService = require('./brandService');

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

async function insertProduct(name, quantity, brandId) {
    const brandExist = brandService.findById(brandId);
    if(!brandExist){
        throw new Error("A marca não está cadastrada no sistema");
        
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
        await productModel.create({
            name, brandId
        })
    }else{
        await productModel.create({
            name, quantity, brandId
        })
    }
}


module.exports = {findAllProducts, formBrandNames, insertProduct};