const pool = require("../pool/pool");

async function signUpUser(username, email, password) {
    await pool.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3)", [username, email, password])
}

async function getUser(email) {
 
    const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    return rows;
    
}

module.exports = {
    signUpUser,
    getUser
}