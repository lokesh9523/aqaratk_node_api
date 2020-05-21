/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('logins', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    mobile_number: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    user_name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false
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
    tableName: 'logins',
    createdAt: false,
    updatedAt: false

  });
};

