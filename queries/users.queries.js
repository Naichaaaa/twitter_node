const User = require('../database/models/user.model');
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "naimlawani01@gmail.com", //A changer  
        pass: "jscvhomhseugkqih", // A changer aussi mais need un reglage pour avoir un code 
    },
});
exports.createUser = async (user) => {
    try {
        const hashedPassword = await User.hashPassword(user.password);
        const newUser = new User({
        username: user.username,
        local: {
            email: user.email,
            password: hashedPassword
        }
        })

        // J'ai rajouté ce code pour 
        const sendEmail = await transporter.sendMail({
            from: 'naimlawani01@gmail.com', // sender address
            to: "naichatoumeite@gmail.com", // list of receivers
            subject: "Send email in Node.JS with Nodemailer using Gmail account", // Subject line
            text: "Hello world?", // plain text body
            html: "<br>J'ai fait un comit sur ton code tu verras le code que j'ai ajouté (users.queries) </br> tu peux changer tom mail mais il y des reglage a faire sur ton compte gmail?</b>", // html body
        });
        return newUser.save();
    } catch(e) {
        throw e;
    }
}

exports.findUserPerEmail = (email) => {
    return User.findOne({ 'local.email': email }).exec();
}

exports.findUserPerId = (id) => {
    return User.findById(id).exec();
}

exports.findUserPerUsername = (username) => {
    return User.findOne({ username }).exec();
}

exports.searchUsersPerUsername = (search) => {
    const regExp = `^${ search }`;
    const reg = new RegExp(regExp);
    return User.find({ username: { $regex: reg }}).exec();
}

exports.addUserIdToCurrentUserFollowing = (currentUser, userId) => {
    currentUser.following = [ ...currentUser.following, userId ];
    return currentUser.save();
}

exports.aremoveUserIdToCurrentUserFollowing = (currentUser, userId) => {
    currentUser.following = currentUser.following.filter( objId => objId.toString() !== userId );
    return currentUser.save();
}