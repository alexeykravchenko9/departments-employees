export default (sequelize, DataTypes) => {
    const Department = sequelize.define('Department', {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            unique: {
                args: true,
                msg: 'Department already exist'
            },
            validate: {
                checkUnique (value, next) {

                        Department.findAll().then( data => {

                            const dbItems = data.map(item => item.dataValues.name.toLowerCase());

                            if (dbItems.some(item => item === value)) {
                                return next('Department already exist');
                            }

                            next();

                        }).catch(e => next(e));
                }
            }
        },
        description: {
            type: DataTypes.STRING(255),
            validate:{
                len:{
                    args: [0, 255],
                    msg: 'Description are too long'
                }
            }
        }
    });

    Department.associate = models => models.Department.hasMany(models.Employee, {
        onDelete: "CASCADE"
    });

    return Department;
}