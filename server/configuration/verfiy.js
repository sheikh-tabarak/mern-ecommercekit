const jwt = require("jsonwebtoken");
const secret = process.env.MY_SECRET;

const verfiyJWT = (req, res, next) => {
  const token = req.headers["x-header-token"];

  if (!token) {
    res.send("No token!");
  } else {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: "Token not valid" });
      } else {
        res.json({ auth: true, 
            userId:decoded.userId, 
            userEmail:decoded.userEmail,
            userName:decoded.userName,
            isAdmin:decoded.isAdmin,
            // token:decoded.token
        });
        // req.id = decoded.id;
        next();
      }
    });
  }
};

module.exports = verfiyJWT;
