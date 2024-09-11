const jwt = require('jsonwebtoken');
const JWT_SECRET = "signedin";

const fetchUser = (req,res, next)=>{
    const token = req.header('auth-token');
    if(!token){
        return res.status(401).json({ errors: "Please authenticate using a valid token" });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        console.error(error.message);
        res.status(401).json({ errors: "Please authenticate using a valid token" });
    }
}

module.exports = fetchUser;