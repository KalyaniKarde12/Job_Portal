import { clerkClient } from '@clerk/clerk-sdk-node';

export const requireAuth = () => {
    return async (req, res, next) => {
        try {
            // Get the token from the Authorization header
            const authHeader = req.headers.authorization;
            
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(401).json({ 
                    success: false, 
                    message: 'No token provided' 
                });
            }

            const token = authHeader.split(' ')[1];

            // Verify the token with Clerk
            const decoded = await clerkClient.verifyToken(token);
            
            // Add user info to request object
            req.auth = {
                userId: decoded.sub
            };
            
            next();
        } catch (error) {
            console.error('Authentication error:', error);
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid token' 
            });
        }
    };
};