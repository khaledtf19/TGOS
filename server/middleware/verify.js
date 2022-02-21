import jwt from "jsonwebtoken";

export default function (req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).json({ Error: "Access Denied" });

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(401).json({ Error: "Invalid Token" });
  }
}
