import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
    const accessToken = req.header("accessToken");
    // const token = req.cookies.accessToken;

    if (!token) return res.status(401).json({ error: "No token provided." });

    try {
        const validToken = jwt.verify(accessToken, "secret");
        req.user = validToken;
        if (validToken) {
            return next();
        }
    } catch (err) {
        return res.status(500).json({ error: err })
    }
};