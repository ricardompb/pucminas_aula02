import { Sequelize, DataTypes } from 'sequelize'

// const sequelize = new Sequelize('sqlite::memory:')

const sequelize = new Sequelize('aula02', 'pucminas', 'pucminas', {
    host: 'localhost',
    dialect: 'postgres' /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
})

export {
    sequelize,
    DataTypes
}