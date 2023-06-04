const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const tokenBlacklist = require('../models/tokenBlacklist')

const protect = asyncHandler(async (req, res, next) => {
    let token = req.headers.authorization
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1] // bearer token
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            // Get user from the token
            req.user = await User.findById(decoded.id).select('-password')

            const isRevoked = await tokenBlacklist.findOne({ token });
            
            if(isRevoked) {
                const errorMessage = 'Token revoked';

                const error = new Error(errorMessage);
                error.status = 401;
                error.stack = new Error().stack; // Capture the current stack trace
                
                res.status(error.status).json({
                    message: errorMessage,
                    stack: error.stack,
                });
            }
            
            else{
                switch (true) 
            {
                case req.originalUrl.includes('/vapi'):
                    if (req.user.role === 1) 
                    {
                        next() 
                    }
                    else
                    {
                        const errorMessage = 'Not authorized as Vendor';
                        const error = new Error(errorMessage);
                        error.status = 401;
                        error.stack = new Error().stack; // Capture the current stack trace
                      
                        res.status(error.status).json({
                          message: errorMessage,
                          stack: error.stack,
                        });
                        res.status(401)
                        
                    }
                    break

                case req.originalUrl.includes('/sapi'):
                    if (req.user.role === 3)
                    {
                        next()
                    }
                    else if(req.originalUrl.includes('/sapi/categories/')){
                        if(req.user.role === 3 || req.user.role === 0){
                            next()
                        }
                        else{
                            const errorMessage = 'Not authorized as super admin / customer';
                            const error = new Error(errorMessage);
                            error.status = 401;
                            error.stack = new Error().stack; // Capture the current stack trace
                        
                            res.status(error.status).json({
                            message: errorMessage,
                            stack: error.stack,
                            });
                        }
                    }
                    else {
                        const errorMessage = 'Not authorized as super admin';
                        const error = new Error(errorMessage);
                        error.status = 401;
                        error.stack = new Error().stack; // Capture the current stack trace
                      
                        res.status(error.status).json({
                          message: errorMessage,
                          stack: error.stack,
                        });
                      
                        //throw error;
                      }
                      
                    break

                case req.originalUrl.includes('/users'):
                    next()
                    break

                case req.originalUrl.includes('/api'):
                    if (req.user.role === 0)
                    {
                        next()
                    }
                    else
                    {
                        const errorMessage = 'Not a Customer';
                        const error = new Error(errorMessage);
                        error.status = 401;
                        error.stack = new Error().stack; // Capture the current stack trace
                      
                        res.status(error.status).json({
                          message: errorMessage,
                          stack: error.stack,
                        });
                    }
                    break

            }
           
            }
            
        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error('Invalid token')

        }
    }

    if (!token) {
        res.status(401)
        throw new Error('No token, authorization denied')
    }
})

module.exports = {protect}
