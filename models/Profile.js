const {db, DataTypes, Model} = require('../db/connection')
let Profile = db.define("profile", {
    bio: DataTypes.STRING,
    profilePicture: DataTypes.STRING,
    birthday: DataTypes.STRING,
});


module.exports = Profile;