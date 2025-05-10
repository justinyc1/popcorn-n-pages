import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

export const authenticateToken = (req, res, next) => {
    // const accessToken = req.header("accessToken");
    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json({ error: "No token provided." });
    // if (!token) return res.status(401).json();

    try {
        const validToken = jwt.verify(token, "secret");
        req.user = validToken;
        if (validToken) {
            return next();
        }
    } catch (err) {
        return res.status(501).json({ error: "Invalid token." })
    }
};