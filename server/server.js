const express = require("express");
const app = express();
const consign = require("consign");

app.set("view engine","ejs");
app.use(express.static("public",{
    index:false,
    immutable:true,
    cacheControl:true
}));

consign()
.then("./database/database.js")
.then("./middlewares")
.then("./functions/functions.js")
.then("./user")
.then("./punk")
.into(app);

module.exports=app;