const { Sequelize } = require('sequelize');
const productModel = require('../models/product');
const brands = require('../models/brand');

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
        }
    });

    return products;
}


module.exports = {findAllProducts};