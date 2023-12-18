const { expressjwt } = require('express-jwt');


 function authJwt() {
  const secret = process.env.MY_SECRET;
  const API = process.env.ECOMMERCE_APP_URL;
  return expressjwt({
    secret: secret,
    algorithms: ["HS256"],
    isRevoked: isRevoke,
  }).unless({
    path: [
      {
        url: /\/api\/products(.*)/,
        methods: ["GET", "OPTIONS"],
      },
      {
        url: /\/api\/categories(.*)/,
        methods: ["GET", "OPTIONS"],
      },

      {
        url: /\/public\/uploads(.*)/,
        methods: ["GET", "OPTIONS"],
      },
      `${API}/users/login`,
      `${API}/users/register`,
      `${API}/users/refresh/token`,

   
      
    ],
  });
}

async function isRevoke(req, payload){
  console.log(payload.payload.isAdmin);
  if (payload.payload.isAdmin==false) {
    // done(null, true);
    return true;
  }
  // done();
  return false;
}




module.exports = authJwt;
