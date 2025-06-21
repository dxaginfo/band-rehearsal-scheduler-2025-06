'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const Band = sequelize.define('Band', {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 100]
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    logo_url: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    created_by: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'bands',
    timestamps: true,
    underscored: true
  });

  Band.associate = (models) => {
    // Band belongs to a creator (User)
    Band.belongsTo(models.User, {
      foreignKey: 'created_by',
      as: 'creator'
    });

    // Band has many members (through BandMembers)
    Band.belongsToMany(models.User, {
      through: models.BandMember,
      foreignKey: 'band_id',
      otherKey: 'user_id',
      as: 'members'
    });

    // Band has many rehearsals
    Band.hasMany(models.Rehearsal, {
      foreignKey: 'band_id',
      as: 'rehearsals'
    });
  };

  return Band;
};