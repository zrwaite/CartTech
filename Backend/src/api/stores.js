const Stores = require('../models/stores');
const response = require('../models/response'); //Created pre-formatted uniform response


/* register controller */
module.exports = class storesController {
    static async apiGetStores(req, res, next) {
        let result = new response();
        // search if the project already exsisted (call findOne function)
        let stores;
        if (req.query.id === undefined) {
            try{
                stores = await Stores.find({});
                result.connected = true;
            } catch (e) {
                result.status = 400;
                result.errors.push("Stores not found", e);
            }
        } else {
            try{
                stores = await Stores.findById(req.query.id);
                result.connected = true;
            } catch (e) {
                result.status = 400;
                result.errors.push("ID Error", e);
            }
        }
        if (result.connected){
            if (stores == null) {
                result.status = 404;
                result.errors.push('Store not found');
            } else{
                result.status = 200;
                result.success = true;
                result.response = {"stores": stores};
            }
        }
        res.status(result.status).json(result); //Return whatever result remains
    }
}