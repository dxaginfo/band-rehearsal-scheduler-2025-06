'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const Rehearsal = sequelize.define('Rehearsal', {
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
    title: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    location: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('scheduled', 'canceled', 'completed'),
      allowNull: false,
      defaultValue: 'scheduled'
    },
    created_by: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    recurring_pattern: {
      type: DataTypes.JSON,
      allowNull: true,
      comment: 'JSON config for recurring rehearsals (frequency, end_date, etc.)'
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
    tableName: 'rehearsals',
    timestamps: true,
    underscored: true
  });

  Rehearsal.associate = (models) => {
    // Rehearsal belongs to a Band
    Rehearsal.belongsTo(models.Band, {
      foreignKey: 'band_id',
      as: 'band'
    });

    // Rehearsal belongs to a creator (User)
    Rehearsal.belongsTo(models.User, {
      foreignKey: 'created_by',
      as: 'creator'
    });

    // Rehearsal has many attendees
    Rehearsal.hasMany(models.RehearsalAttendee, {
      foreignKey: 'rehearsal_id',
      as: 'attendees'
    });

    // Rehearsal has many resources
    Rehearsal.hasMany(models.RehearsalResource, {
      foreignKey: 'rehearsal_id',
      as: 'resources'
    });

    // Rehearsal has many notes
    Rehearsal.hasMany(models.RehearsalNote, {
      foreignKey: 'rehearsal_id',
      as: 'notes'
    });
  };

  return Rehearsal;
};