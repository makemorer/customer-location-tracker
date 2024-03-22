module.exports = (sequelize, DataTypes)=>(
    //create a table and define it fields
    sequelize.define("Users", {
        //fileds
        fullname:{
            type: DataTypes.STRING,
            allowNull: false
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false
        },
        destination:{
            type: DataTypes.STRING,
            allowNull: false
        },
        latitude:{
            type: DataTypes.STRING,
            allowNull: false
        },
        longitude:{
            type: DataTypes.STRING,
            allowNull: false
        }
    })
)