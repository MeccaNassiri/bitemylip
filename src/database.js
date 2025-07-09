import mysql from 'mysql2';

import dotenv from 'dotenv';
dotenv.config();

const usersTableName = 'users';

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();

class User {
    id;
    username;
    password;
    email;
    creation_time;

    constructor(db_user) {
        this.id = db_user.id;
        this.username = username;
        this.password = db_user.password;
        this.email = db_user.email;
        this.creation_time = db_user.creation_time;
    }
}

async function addNewUser(username, password, email) {
    return false;
}

function processDatabaseSelectUserReturn(rows) {
    if (Array.isArray(rows) && rows.length) {
        return rows[0];
    }

    return null;
}

async function getUserById(id) {
    let [rows] = await pool.query(`
    SELECT *
    FROM ${usersTableName}
    WHERE id = ?
    ORDER BY id ASC
    LIMIT 1`, [id]);

    return processDatabaseSelectUserReturn(rows);
}

async function getUserByUsername(username) {
    let [rows] = await pool.query(`
    SELECT *
    FROM ${usersTableName}
    WHERE username = ?
    ORDER BY id ASC
    LIMIT 1`, [username]);

    return processDatabaseSelectUserReturn(rows);
}

async function getUserByEmail(email) {
    let [rows] = await pool.query(`
    SELECT *
    FROM ${usersTableName}
    WHERE email = ?
    ORDER BY id ASC
    LIMIT 1`, [email]);

    return processDatabaseSelectUserReturn(rows);
}