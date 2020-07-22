module.exports = app => {

    const {Connect, Sequelize} = app.database.database;
  
      const Users = Connect.define ('users', {
  
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true 
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        }
  
      });
  
      
      Users.sync({force:false});
  
      return { Users };

  };