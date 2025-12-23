import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config()
const middleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
        try {
            console.log("Validating token...");
            if (!process.env.SECRET_KEY) {
                console.error("CRITICAL: SECRET_KEY is missing in process.env!");
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            req.userId = decoded.userId;
            next();
        }
        catch (e) {
            console.error("Token validation failed:", e.message);
            res.status(401).json({ message: "Invalid token" });
        }
    }
    else {
        res.status(401).json({ message: "No token provided" });
    }

}
export default middleware