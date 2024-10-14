const { Comment, Like, Post, Profile, User } = require("./index");
const { db } = require('./db/connection.js');
const users = require("./seed/users.json")
const likes = require("./seed/likes.json")
const comments = require("./seed/comments.json")
const profiles = require("./seed/profiles.json")
const posts = require("./seed/posts.json")


describe('Social Sequelzie Test', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the test suite is run
        await db.sync({ force: true });
    })
    afterAll(async () => {
        await db.drop();  // Drop all tables from the database
        await db.close(); // Close the connection to the database
      });
    // Write your tests here
    
      test("Can create Users", async function() {
        await User.bulkCreate(users)
        const foundUser = await User.findByPk(1);
        expect(foundUser).toEqual(expect.objectContaining(users[0]))
      });
      test("Can create Profiles", async function() {
        await Profile.bulkCreate(profiles)
        const foundProfile = await Profile.findByPk(1);
        expect(foundProfile).toEqual(expect.objectContaining(profiles[0]))
      });
      test("Can create Posts", async function() {
        await Post.bulkCreate(posts)
        const foundPost = await Post.findByPk(1);
        expect(foundPost).toEqual(expect.objectContaining(posts[0]))
      });
      test("Can create Comments", async function() {
        await Comment.bulkCreate(comments)
        const foundComment = await Comment.findByPk(1);
        expect(foundComment).toEqual(expect.objectContaining(comments[0]))
      });
      test("Can create Likes", async function() {
        await Like.bulkCreate(likes)
        const foundLike = await Like.findByPk(1);
        expect(foundLike).toEqual(expect.objectContaining(likes[0]))
      });


      test('User and Profile have a one-to-one association', async () => {
        await db.sync({force: true})
        let myUser = await User.create(users[0])
        let myProfile = await Profile.create(profiles[0])

        await myUser.setProfile(myProfile);

        const associatedProfile = await myUser.getProfile();
        expect(associatedProfile instanceof Profile).toBeTruthy;
        
      });

      test('User can have many Likes', async () =>{
        await db.sync({force: true})
        let myUser = await User.create(users[0]);
        let myLike1 = await Like.create(likes[0]);
        let myLike2 = await Like.create(likes[1]);

        await myUser.addLike(myLike1);
        await myUser.addLike(myLike2);

        const associatedLikes = await myUser.getLikes();

        expect(associatedLikes.length).toBe(2);
        expect(associatedLikes instanceof Like).toBeTruthy;

      });
      test('Like can have many Users', async () =>{
        await db.sync({force: true})
        let myUser1 = await User.create(users[0]);
        let myUser2 = await User.create(users[1]);
        let myLike = await Like.create(likes[0]);

        await myLike.addUser(myUser1);
        await myLike.addUser(myUser2);

        const associatedUsers = await myLike.getUsers();

        expect(associatedUsers.length).toBe(2);
        expect(associatedUsers instanceof User).toBeTruthy;

      })
    
      
})

