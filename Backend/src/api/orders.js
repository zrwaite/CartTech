const Orders = require('../models/orders');
const response = require('../models/response'); //Created pre-formatted uniform response


/* register controller */
module.exports = class ordersController {
    static async apiGetOrders(req, res, next) {
        let result = new response();
        // search if the project already exsisted (call findOne function)
        let orders;
        if (req.query.id === undefined) {
            try{
                orders = await Orders.find({});
                result.connected = true;
            } catch (e) {
                result.status = 400;
                result.errors.push("Orders not found", e);
            }
        } else {
            try{
                orders = await Orders.findById(req.query.id);
                result.connected = true;
            } catch (e) {
                result.status = 400;
                result.errors.push("ID Error", e);
            }
        }
        if (result.connected){
            if (orders == null) {
                result.status = 404;
                result.errors.push('Orders not found');
            } else{
                result.status = 200;
                result.success = true;
                result.response = {"orders": orders};
            }
        }
        res.status(result.status).json(result); //Return whatever result remains
    }
}