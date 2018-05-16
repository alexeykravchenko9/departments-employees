'use strict';
import Sequelize from 'sequelize';
import fs from 'fs';
import path from 'path';

// Config options
import configApp from '../config.js';
const { database, username, password, hostname } = configApp().db;

const basename  = path.basename(__filename);
const db        = {};

const sequelize = new Sequelize(database, username, password, {
    host: hostname,
    dialect: 'postgres'
});

sequelize.authenticate()
    .then( () => {
        console.log('Connection has been established successfully');
    })
    .catch( () => {
        throw new Error('Connection with the DB failed');
});

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        let model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;