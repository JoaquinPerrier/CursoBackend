const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.createToken = async function (payload) {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1000000s",
  });
  return token;
};

exports.checkToken = async function (req) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (token === null || token == undefined)
      throw new Error("JWT: Falta el token");

    const user = jwt.verify(
      token,
      process.env.JWT_SECRET,
      (err, decodedToken) => {
        if (err)
          throw new Error(
            "JWT: no autorizado (el token expiro o la firma no es valida)"
          );
        return decodedToken;
      }
    );
    return user;
  } catch (error) {
    return { error, message: error.message };
  }
};
