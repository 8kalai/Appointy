/*import jwt from "jsonwebtoken"

// admin authentication middleware
const authAdmin = async (req, res, next) => {
    try {
        const { atoken } = req.headers
        if (!atoken) {
            return res.json({ success: false, message: 'Not Authorized Login Again' })
        }
        const token_decode = jwt.verify(atoken, process.env.JWT_SECRET)
        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({ success: false, message: 'Not Authorized Login Again' })
        }
        next()
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export default authAdmin;*/

/*import jwt from "jsonwebtoken";

// admin authentication middleware
const authAdmin = async (req, res, next) => {
    try {
        const { atoken } = req.headers;

        if (!atoken) {
            return res.json({
                success: false,
                message: "Not Authorized. Login Again"
            });
        }

        // Verify token
        const decoded = jwt.verify(atoken, process.env.JWT_SECRET);

        // Ensure token belongs to admin
        if (!decoded.admin) {
            return res.json({
                success: false,
                message: "Not Authorized. Login Again"
            });
        }

        next();

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};

export default authAdmin;*/

/*import jwt from "jsonwebtoken";

// admin authentication middleware
const authAdmin = async (req, res, next) => {
    try {
        // ❗ FIX: Use the standard Authorization header
        const authHeader = req.headers.authorization; 

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            // Check if header is missing or doesn't start with "Bearer "
            return res.status(401).json({ 
                success: false,
                message: "Not Authorized. Bearer token missing."
            });
        }
        
        // Extract the token part (the string after "Bearer ")
        const token = authHeader.split(' ')[1]; 
        console.log("Verifying Secret:", process.env.JWT_SECRET);
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Attach admin ID to request
        req.adminId = decoded.id; 

        next();

    } catch (error) {
        console.log("JWT Verification Error:", error.message);
        // Return 401 Unauthorized for token failure
        res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};

export default authAdmin;*/



import jwt from "jsonwebtoken";

// 🛑 TEMPORARY FIX: Use a hardcoded string for verification. 
// This must match the string used in the login controller.
const KNOWN_SECRET = "Kalaivani08"; 

// admin authentication middleware
const authAdmin = async (req, res, next) => {
    try {
        // ❗ FIX: Use the standard Authorization header
        const authHeader = req.headers.authorization; 

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            // Check if header is missing or doesn't start with "Bearer "
            return res.status(401).json({ 
                success: false,
                message: "Not Authorized. Bearer token missing."
            });
        }
        
        // Extract the token part (the string after "Bearer ")
        const token = authHeader.split(' ')[1]; 
        
        // 🚨 CRITICAL FIX: Use the hardcoded secret for verification
        const decoded = jwt.verify(token, KNOWN_SECRET);
        
        // Attach admin ID to request
        req.adminId = decoded.id; 

        next();

    } catch (error) {
        console.log("JWT Verification Error:", error.message);
        // Return 401 Unauthorized for token failure
        res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};

export default authAdmin;
