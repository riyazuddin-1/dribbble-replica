const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

// Database connection establishment
const {sql, tables } = require('../database');


/**
 * NOTE:
 * Table name for storing user profile data is `profiles`
 */

const profileControllers = {};

profileControllers.getProfile = async (req, res) => {
    username = req.body.username;
    var query = await sql`
        select 
            username, 
            avatar 
        from profiles
        where username = ${username}
    `;
    if(query.length)
        res.status(200).json({
            profileComplete: true,
            userProfile: query[0]
        }).send();
    else
        res.status(200).json({
            profileComplete: false
        }).send();
}

profileControllers.saveProfile = async (req, res) => {
    let payload = {
        username : req.body.username,
        location : req.body.location,
        profile: req.body.options
    }
    image = req.files.avatar;
    try {
        const byteArrayBuffer = image.data;
        new Promise((resolve) => {
            cloudinary.v2.uploader.upload_stream((error, uploadResult) => {
                return resolve(uploadResult);
            }).end(byteArrayBuffer);
        }).then(async (uploadResult) => {
            payload = {
                ...payload,
                avatar: uploadResult.url,
                image_id: uploadResult.public_id
            }
            var query = await sql`
                insert into profiles 
                ${sql(payload, 'username', 'profile', 'location', 'avatar', 'image_id')} 
                returning username, avatar
            `;
            if(query.length)                
                res.status(200).json({
                    profileComplete: true,
                    userProfile: query[0]
                }).send();
            else
                res.status(200).json({
                    profileComplete: false
                }).send();
        });
    } catch (error) {
        console.error(error);
        res.status(300).send('Unable to create profile');
    }
}

module.exports = profileControllers;