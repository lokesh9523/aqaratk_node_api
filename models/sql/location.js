/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('location', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    display_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    status: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '1'
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    date_updated: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'location',
    createdAt: false,
    updatedAt: false
  });
};
