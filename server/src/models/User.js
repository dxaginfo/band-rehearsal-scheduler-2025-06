'use strict';
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        len: [3, 50]
      }
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    first_name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    last_name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    profile_image_url: {
      type: DataTypes.STRING(255),
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
    tableName: 'users',
    timestamps: true,
    underscored: true,
    hooks: {
      beforeSave: async (user) => {
        if (user.changed('password_hash')) {
          const salt = await bcrypt.genSalt(10);
          user.password_hash = await bcrypt.hash(user.password_hash, salt);
        }
      }
    }
  });

  User.associate = (models) => {
    // User can belong to many bands (through BandMembers)
    User.belongsToMany(models.Band, {
      through: models.BandMember,
      foreignKey: 'user_id',
      otherKey: 'band_id'
    });

    // User has many availabilities
    User.hasMany(models.Availability, {
      foreignKey: 'user_id',
      as: 'availabilities'
    });

    // User has many specific unavailabilities
    User.hasMany(models.SpecificUnavailability, {
      foreignKey: 'user_id',
      as: 'specificUnavailabilities'
    });

    // User has created many bands
    User.hasMany(models.Band, {
      foreignKey: 'created_by',
      as: 'createdBands'
    });

    // User has created many rehearsals
    User.hasMany(models.Rehearsal, {
      foreignKey: 'created_by',
      as: 'createdRehearsals'
    });

    // User has many rehearsal attendances
    User.hasMany(models.RehearsalAttendee, {
      foreignKey: 'user_id',
      as: 'rehearsalAttendances'
    });

    // User has uploaded many rehearsal resources
    User.hasMany(models.RehearsalResource, {
      foreignKey: 'uploaded_by',
      as: 'uploadedResources'
    });

    // User has many rehearsal notes
    User.hasMany(models.RehearsalNote, {
      foreignKey: 'user_id',
      as: 'rehearsalNotes'
    });

    // User has many notifications
    User.hasMany(models.Notification, {
      foreignKey: 'user_id',
      as: 'notifications'
    });
  };

  // Instance methods
  User.prototype.validatePassword = async function(password) {
    return await bcrypt.compare(password, this.password_hash);
  };

  // Class methods
  User.findByEmail = async function(email) {
    return await User.findOne({ where: { email } });
  };

  return User;
};