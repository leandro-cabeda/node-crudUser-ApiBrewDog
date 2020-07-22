const Sequelize=require("sequelize");

const Connect=new Sequelize(
    "mytapp",
    "postgres",
    "",{
    host:"localhost",
    dialect:"postgres",
    timezone: "-03:00"
});


module.exports={
    Connect,
    Sequelize
};