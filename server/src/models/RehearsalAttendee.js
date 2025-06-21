'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const RehearsalAttendee = sequelize.define('RehearsalAttendee', {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      allowNull: false,
      primaryKey: true
    },
    rehearsal_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'rehearsals',
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
    response: {
      type: DataTypes.ENUM('yes', 'no', 'maybe'),
      allowNull: true
    },
    response_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    attendance_status: {
      type: DataTypes.ENUM('attended', 'absent', 'late'),
      allowNull: true
    },
    late_minutes: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true
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
    tableName: 'rehearsal_attendees',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ['rehearsal_id', 'user_id']
      }
    ]
  });

  RehearsalAttendee.associate = (models) => {
    // RehearsalAttendee belongs to a Rehearsal
    RehearsalAttendee.belongsTo(models.Rehearsal, {
      foreignKey: 'rehearsal_id',
      as: 'rehearsal'
    });

    // RehearsalAttendee belongs to a User
    RehearsalAttendee.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    });
  };

  return RehearsalAttendee;
};