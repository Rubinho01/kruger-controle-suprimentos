const { Sequelize } = require('sequelize');
const productModel = require('../models/product');

async function findAllProducts() {
    const products = await productModel.findAll({
        attributes: {
            include: [[
                Sequelize.col('brand.name'),
                'brandName'

            ]]
        },
        include: {
            model: brand,
            attributes:[]
        }
    });

    return products;
}


module.exports = {findAllProducts};