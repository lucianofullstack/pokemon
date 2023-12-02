let path = require('path'),
filename = path.parse(__filename).name.toString().toLowerCase()
filename = filename.charAt(0).toUpperCase() + filename.slice(1)

const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define(filename, {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: false }
)}
