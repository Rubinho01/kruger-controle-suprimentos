const productService = require('../services/productService');

async function loadDashboard(req, res) {

    const products = await productService.findAllProducts();
    const name = req.session.userName;
    res.render('dashboard', {name, products});
};

async function loadCreateForm(req, res) {
    const brands = await productService.formBrandNames();
    res.render('product/createProductForm', {brands, error: false});
}

async function createProduct(req, res) {
    const {name, quantity, brandId} = req.body;

    if(!name){
        const brands = await productService.formBrandNames();
        res.render('product/createProductForm', {
            brands,
             error: 'O campo nome é obrigatório'})
    }

    if(!brandId){
        const brands = await productService.formBrandNames();
        res.render('product/createProductForm', {
            brands,
             error: 'É obrigatório informar a marca'})
    }

    try {
        await productService.insertProduct(name,quantity,brandId, req.session.userName);
        res.redirect('/dashboard')
    } catch (error) {
        const brands = await productService.formBrandNames();
        res.status(400).render('product/createProductForm', {brands, error: error.message});
    }
    
}

async function deleteProduct(req, res, next) {
    const productId = req.params.id;
    if(!productId){
        throw new Error("Identificação do produto não encontrada para exclusão");
    }
    try {
        await productService.deleteById(productId);
        res.redirect('/dashboard')
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = {loadDashboard, loadCreateForm, createProduct, deleteProduct};