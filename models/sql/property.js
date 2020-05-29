/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('property', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    login_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    location_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    property_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    no_of_bed_rooms: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    furniture: {
      type: DataTypes.ENUM('Semi Furnished','Fully Furnished'),
      allowNull: false
    },
    price: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    date_updated: {
      type: DataTypes.DATE,
      allowNull: true
    },
    images: {
      type: DataTypes.JSON,
      allowNull: true
    }
  }, {
    tableName: 'property',
    createdAt: false,
    updatedAt: false
  });
};
