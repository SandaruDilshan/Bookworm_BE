import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// const responae = await fetch("https://localhost:3000/api/books", {
//     method: "POST",
//     body: JSON.stringify({
//         title,
//         caption
//     }),
//     headers: {Authorization : `Bearer ${token}` },
// });

const protectRoute = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer", "");  //Bearer	-> Tells the server the token follows
        if (!token) return res.status(402).json({ message: "No authentication token provided" });

        // veryfy token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //find user
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) return res.status(401).json({ message: "Token isn't valid, User not found" });

        req.User = user;
        next();

    } catch (error) {
        console.log("Error in protectRoute:", error);
        res.status(401).json({ message: "Internal server error" }); 
    }
}

export default protectRoute;