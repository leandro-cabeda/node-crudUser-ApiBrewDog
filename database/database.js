const Sequelize=require("sequelize");

const Connect=new Sequelize(
    "mytapp",
    "postgres",
    "963852741",{
    host:"localhost",
    dialect:"postgres",
    timezone: "-03:00"
});


module.exports={
    Connect,
    Sequelize
};