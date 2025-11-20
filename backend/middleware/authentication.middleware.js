const jwt = require("jsonwebtoken");

// const authentication = (req, res, next) => {
//   const token = req.cookies.token;
//   if (!token) {
//     return res.status(401).json({ message: "Unauthorized: No token" });
//   }
//   try {
//     const payload = jwt.verify(token, process.env.JWT_SECRET);
//     req.id = payload.id;
//     next();
//   } catch (error) {
//    return res.status(401).json({ message: "Invalid token" });
//   }
// };


const authentication =  (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        let token
        if(authHeader && authHeader.startsWith('Bearer ')){
            token = authHeader.split(' ')[1]
        }
        
        if(!token){
            token = req.cookies.token
        }

        if(!token){
            return res.status(401).json({
                message:"Unauthorized: No token provided"
            })
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decoded;
        next()
    } catch (error) {
        res.status(500).json({
            message:"Internal Server Error"
        })
    }
}

module.exports = authentication;
