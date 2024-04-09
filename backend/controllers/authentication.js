const bcrypt = require('bcryptjs');

// Database connection establishment
const {sql, tables } = require('../database');

/**
 * NOTE:
 * The table name for storing user auth credententials is `users`
 * 
 */

const authControllers = {};

authControllers.login = async (req, res) => {
    username = req.body.username;
    password = req.body.password;
    // var result = await db.collection(tableName).findOne({ username: username });
    var query = await sql`
        select 
        username, mail, verified, password
        from users 
        where username = ${username}
    `;
    if(query.length) {
        bcrypt.compare(password, query[0].password).then( (matched)=> {
            if(matched) {
                delete query[0].password;
                res.status(200).json(query[0]).send();
            } else {
                res.status(300).send('password is incorrect');
            }
        })
    } else {
        res.status(300).send(`The id: ${userID} does not exist`);
    }
}

authControllers.register = async (req, res) => {
    mail = req.body.mail;
    password = req.body.password;
    bcrypt.hash(password, 10).then( async (hash) => {
        const payload = {
            name: req.body.name,
            username: req.body.username, 
            mail: mail.toLowerCase(), 
            password: hash,
            verified: false
        };

        const query = await sql`
            insert into users ${
                sql(payload, 'name', 'username', 'mail', 'password', 'verified')
            }
            returning username, mail, verified
        `

        res.status(200).json(query[0]).send();
    })
    .catch(err => {
        console.log(err);
        res.status(300).send('Unable to create profile')});
}

authControllers.getUserDetails = async (req, res) => {
    username = req.body.username;
    var query = await sql`
        select 
            name, 
            username,  
            mail, 
            verified 
        from users 
        where username = ${username}
    `;
    // var result = await db.collection(tableName).findOne({ username: username }, { password: -1 });
    if(query)
        res.status(200).json(query[0]).send();
    else
        res.status(300).send(`UserID ${username} does not exist`);
}

authControllers.checkUsername = async (req, res) => {
    username = req.body.username;
    if(!username.length)
    res.status(300).send();
    var query = await sql`
        select 
        username 
        from users 
        where username = ${username}
    `;
    // var result = await db.collection(tableName).findOne({ username: username });
    if(query.length) {
        res.status(300).send();
    } else {
        res.status(200).send();
    }
}

// authControllers.updateProfile = (req, res) => {
//     mail = req.body.mail;
//     password = req.body.password;
//     bcrypt.hash(password, 10).then( async (hash) => {
//         await db.collection(tableName).updateOne({ mail: mail }, {$set: {splPass: hash}});
//         res.status(200).send();
//     })
// }

module.exports = authControllers;