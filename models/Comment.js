
const {db, DataTypes, Model} = require('../db/connection')
let Comment = db.define("comment", {
    body: DataTypes.STRING,
    createdAt: DataTypes.STRING
});


module.exports = Comment;