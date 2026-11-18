const jwt = require('jsonwebtoken');

/**
 * Middleware to verify JWT token from the Authorization header.
 * Attaches the decoded user payload (id, role, etc.) to `req.user`.
 */
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ 
      success: false, 
      message: 'Access denied. No token provided or invalid format.' 
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify the token using your secret key from environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_jwt_secret');
    req.user = decoded; // Example payload: { id: '...', role: 'teacher' }
    next();
  } catch (error) {
    return res.status(403).json({ 
      success: false, 
      message: 'Invalid or expired token.' 
    });
  }
};

/**
 * Higher-order middleware for Role-Based Access Control (RBAC).
 * Pass allowed roles as arguments (e.g., requireRole('teacher', 'admin'))
 */
const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Unauthorized. User authentication required.' 
      });
    }

    // Check if the user's role is included in the allowed roles list
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false, 
        message: `Access forbidden. This action requires one of the following roles: ${allowedRoles.join(', ')}.` 
      });
    }

    next();
  };
};

module.exports = {
  verifyToken,
  requireRole,
};