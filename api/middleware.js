import Jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).send("Token tidak ditemukan");
  }

  Jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).send("Token tidak valid");
    }

    req.user = decoded;
    next();
  });
};

export { verifyToken };
