const {db, DataTypes, Model} = require('../db/connection')
let Post = db.define("post", {
    title: DataTypes.STRING,
    body: DataTypes.STRING,
    createdAt: DataTypes.STRING
});


module.exports = Post;


