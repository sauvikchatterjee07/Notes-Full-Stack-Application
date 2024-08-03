const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {

    const token = req.header('Authorization');//use "substring" to achive the same things 
    console.log(token)
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded)
        const user = await User.findById(decoded.id);
        console.log(user)
        if (!user) throw new Error();
        req.user = user;
        next();
    }
    catch(error) {
        res.status(401).send('Not authorized');
    }
};

module.exports=auth;