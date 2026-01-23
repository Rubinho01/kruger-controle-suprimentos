const brandService = require('../services/brandService');

async function createbrand(req, res, next) {
    const name = req.body.name;
    try {
        await brandService.insertBrand(name);
        res.redirect('/dashboard')
    } catch (error) {
        res.status(400).send(error.message);
    }
    
};



module.exports = {createbrand};