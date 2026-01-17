const productService = require('../services/productService');

async function loadDashboard(req, res) {

    const products = await productService.findAllProducts();
    const name = req.session.userName;
    res.render('dashboard', {name, products});
};

async function loadCreateForm(req, res) {
    const brands = await productService.formBrandNames();
    res.render('product/createProductForm', {brands});
}

module.exports = {loadDashboard, loadCreateForm};