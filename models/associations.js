const brand = require('./brand');
const product = require('./product');

brand.hasMany(product, {
    foreignKey: 'brandId',
    as: 'products'
});

product.belongsTo(brand, {
    foreignKey: 'brandId',
    as: 'brand'
});


module.exports = {product, brand};