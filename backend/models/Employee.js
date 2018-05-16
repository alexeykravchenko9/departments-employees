export default (sequelize, DataTypes) => {
    const Employee = sequelize.define('Employee', {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        firstName: {
            type: DataTypes.STRING
        },
        lastName: {
            type: DataTypes.STRING
        },
        age: {
            type: DataTypes.INTEGER,
            validate: {
                isNumeric:{
                    args: true,
                    msg: "Value should cointains only numbers"
                },
                min: {
                    args: 18,
                    msg: 'Your age should be older 18 years'
                },
                max: {
                    args: 80,
                    msg: 'Your should be younger than 80 years'
                } 
            }
        },
        phone: {
            type: DataTypes.STRING
        },
        fullAddress: {
            type: DataTypes.STRING
        }
    });

    Employee.associate = models => models.Employee.belongsTo(models.Department, {
            onDelete: "CASCADE"
        });

    return Employee;
}