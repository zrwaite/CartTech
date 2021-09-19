const app = require("./server.js"); //Runs server
const env = require("dotenv");  //Allows pulling information from .env with process.env
const mongoose = require('mongoose');

// configurations
env.config();
const port = process.env.PORT || 2000;

// mongodb connection
mongoose.connect(
    `${process.env.MONGO_URL}`,
).catch(err =>{
    console.error(err.stack)
    process.exit(1)
}).then(() => {
    // if connection is successful, log it and start the server
    console.log('Database connected');
    app.listen(port, () => {
        console.log(`listening on port ${port}`)
    });
});