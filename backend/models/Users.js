import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            unique: {
                args: true,
                msg: 'Username should be unique'
            },
            validate: {
                checkUnique( value, next ){
                    User.findAll().then( data => {
                        const userItems = data.map(item => item.dataValues.username.toLowerCase() );
                        (userItems.some(item => item === value)) ? next('User already exist') : '';

                        next();

                    }).catch(e => next(e));
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        hooks: {
            beforeCreate: (model, options, next) => {

                return bcrypt.hash(model.password, 10)
                    .then( hash => model.password = hash )
                    .catch( e => next(e));

            }
        }
    });

    return User;
}

