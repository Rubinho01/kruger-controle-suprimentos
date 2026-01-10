const productService = require('../services/productService');

async function loadDashboard(req, res) {

    const products = await productService.findAllProducts();
    const name = req.session.userName;
    console.log(products);
    res.render('dashboard', {name, products});
};

module.exports = {loadDashboard};