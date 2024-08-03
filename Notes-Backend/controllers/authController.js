const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.checkEmailInDB = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        return res.status(200).json({ exists: true });
    } else {
        return res.status(200).json({ exists: false });
    }
};

exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 8);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).send({ message: "user registration successfull" });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    console.log(typeof { email, password });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).send({ message: "User not found" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
        return res.status(400).send({ message: "Incorrect Password" });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(200).send({ user, token });
};

exports.signout = async (req, res) => {
    //First delete all notes associated with te userId
    signOutHelper(req.params);

    //Deete the user also
    try {
        const deleteUser = await User.findByIdAndDelete(req.param);
    } catch (err) {
        res.json({
            message: err,
        });
    }
};

async function signOutHelper(uid) {
    try {
        const result = await Note.deleteMany({ userID: uid });
    } catch (err) {
        res.json({
            message: err,
        });
    }
}
