const Orders = require('../models/orders');
const response = require('../models/response'); //Created pre-formatted uniform response
const env = require("dotenv");
env.config();

/* register controller */
module.exports = class ordersController {
    static async apiGetOrders(req, res, next) {
        let result = new response();
        result.auth =  (req.oidc.user == undefined)? null:req.oidc.user;
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
    static async apiPostOrders(req, res, next) {
        let result = new response();
        const { // get user info from request body
            password,
            store_id,
            username,
            price,
            products,
        } = req.body;
        if (store_id===undefined){result.errors.push("store_id undefined")}
        if (username===undefined){result.errors.push("username undefined")}
        if (price===undefined){result.errors.push("price undefined")}
        if (products===undefined){result.errors.push("products undefined")}
        if (password===undefined || password!==process.env.PASSWORD){result.errors.push("password incorrect")}
        if (result.errors.length==0){
            const taxed_price = Math.round(113*price)/100.0;
            let newOrders;
            try{
                newOrders = new Orders({ //Create branch with input
                    store_id,
                    username,
                    price,
                    taxed_price,
                    products
                });
            } catch (e) {
                result.status = 400;
                result.errors.push("Error creating order", e)
            }
            try{
                await newOrders.save(); //Save the branch to mongodb
                result.status = 201;
                result.response = newOrders
                result.success = true;
            } catch (e) {
                result.status = 400;
                result.errors.push("Error pushing to database", e);
            }
        } else {
            result.status = 400;
        }
        // Push the data to DB asynchronously (call save() function and handle errors)
        res.status(result.status).json(result); //Return whatever result remains
    }
}