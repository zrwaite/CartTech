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
        var querytest = req.query.status+req.query.store_id+req.query.username+req.query.id
        if (querytest !== querytest){ //No store_id specified
            try{
                orders = await Orders.find({});
                result.connected = true;
                result.response = orders;
                result.status = 200;
            } catch (e) {
                result.status = 400;
                result.errors.push("Orders not found", e);
            }
        } else {
            var query = {}
            if (req.query.store_id !== undefined){query.store_id = req.query.store_id}
            if (req.query.username !== undefined){query.username = req.query.username}
            if (req.query.status !== undefined){query.status = req.query.status}
            if (req.query.id === undefined) { //id undefined
                try{
                    orders = await Orders.find(query);
                    result.connected = true;
                    result.response = orders;
                    result.status = 200;
                } catch (e) {
                    result.status = 400;
                    result.errors.push("Query Error", e);
                }
            } else {
                try{
                    orders = await Orders.findById(req.query.id);
                    result.connected = true;
                    result.response = orders;
                    result.status = 200;
                } catch (e) {
                    result.status = 400;
                    result.errors.push("ID Error", e);
                }
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