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


module.exports = {findAllProducts, formBrandNames};