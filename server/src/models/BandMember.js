'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const BandMember = sequelize.define('BandMember', {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      allowNull: false,
      primaryKey: true
    },
    band_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'bands',
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    role: {
      type: DataTypes.ENUM('admin', 'member', 'guest'),
      allowNull: false,
      defaultValue: 'member'
    },
    instrument: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    invitation_status: {
      type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
      allowNull: false,
      defaultValue: 'pending'
    },
    joined_at: {
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
    tableName: 'band_members',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ['band_id', 'user_id']
      }
    ]
  });

  BandMember.associate = (models) => {
    // BandMember belongs to a Band
    BandMember.belongsTo(models.Band, {
      foreignKey: 'band_id'
    });

    // BandMember belongs to a User
    BandMember.belongsTo(models.User, {
      foreignKey: 'user_id'
    });
  };

  return BandMember;
};