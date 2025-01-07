import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: "Not Authenticated" });

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (e, payload) => {
    if (e) return res.status(401).json({ message: "Not Authenticated" });

    req.userId = payload.id;
    next();
  });
};
