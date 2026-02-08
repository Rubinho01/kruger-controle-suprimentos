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
        res.redirect('back')
    } catch (error) {
        res.status(400).send(error.message)
    }
}

async function selectByBrand(req, res, next) {
    try {
        const brands = await productService.CountProductsByBrand();
        return res.render('brandCards', {brands, name: req.session.userName});
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

async function selectOfbrand(req, res, next) {
    const brandId = req.params.id;
    if(!brandId){
        throw new Error("Por favor, indique o Id da marca");
    }
    try {
        const products = await productService.selectProductsByBrand(brandId);
        const brand = await productService.selectBrandForProductsOfBrands(brandId);
        res.render('product/productsOfBrand', {
            name : req.session.userName,
            products,
            brand
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

async function productsOutStock(req, res, next) {
    try {
        const products = await productService.selectAllOutStock();
        res.render('product/outStock',{
             name: req.session.userName,
             products
            })
    } catch (error) {
        res.status(404).send(error.message);
    }
    
}

async function allProductsOrdered(req, res) {
    try {
        const products = await productService.selectAllOrdered();
        res.render('product/Ordered',  {
            name: req.session.userName,
            products
        });
    } catch (error) {
        res.status(400).send(error.message)
    }
    
}

async function showProduct(req, res) {
    const id = req.params.id;
    if(!id){
        throw new Error("informe o Id do produto que deseja alterar");
    };
    try {
        const product = await productService.findById(id);
        res.render('product/edit', {
            name: req.session.userName,
            product,
            error:false
        })
    } catch (error) {
        res.status(401).send(error.message);
    }
}

async function editProduct(req, res) {
    const id = req.params.id;
        if(!id){
        throw new Error("Por favor, informe o id do produto que será editado");      
    }

    const {name, quantity, lastPrice, ordered} = req.body;
    if(!name){
        throw new Error("o campo nome é obrigatório");        
    }

    try {
        await productService.updateProduct(id, name, quantity, lastPrice, ordered);
        res.redirect(`/product/edit/${id}`);
    } catch (error) {
        const product = await productService.findById(id);
        res.send(400).render('product/edit',{
            name: req.session.userName,
            product,
            error:true
        });
    };

};


module.exports = {loadDashboard, loadCreateForm, createProduct, deleteProduct, selectByBrand,
    selectOfbrand, productsOutStock, allProductsOrdered, showProduct, editProduct
};