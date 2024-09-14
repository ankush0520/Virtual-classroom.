// models/Course.js
module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define('Course', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
  });

  Course.associate = (models) => {
    Course.hasMany(models.Unit, { foreignKey: 'courseId' });
  };

  return Course;
};

// models/Unit.js
module.exports = (sequelize, DataTypes) => {
  const Unit = sequelize.define('Unit', {
    title: DataTypes.STRING,
  });

  Unit.associate = (models) => {
    Unit.belongsTo(models.Course, { foreignKey: 'courseId' });
    Unit.hasMany(models.Session, { foreignKey: 'unitId' });
  };

  return Unit;
};

// models/Session.js
module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define('Session', {
    title: DataTypes.STRING,
  });

  Session.associate = (models) => {
    Session.belongsTo(models.Unit, { foreignKey: 'unitId' });
    Session.hasMany(models.Lecture, { foreignKey: 'sessionId' });
  };

  return Session;
};
