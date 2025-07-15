import jwt from 'jsonwebtoken'
const secret = 'Secret_Key'

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];
  if (!token) return res.status(401).json({ message: "Token missing" });

  try {
    const decoded = jwt.verify(token, secret);
    req.user = {email:decoded.email};
    console.log(req.user);
    //console.log("Token received on backend:", token);

    next();
  } catch (err) {
    console.log(err)
    return res.status(403).json({ message: "Invalid token", err });
  }
}
export default authenticateToken;