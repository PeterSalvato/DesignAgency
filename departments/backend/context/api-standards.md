# Backend Department - API Standards

## RESTful API Design Principles

### URL Structure
```
✅ Good: Resource-based URLs
GET    /api/users              # Get all users
GET    /api/users/:id          # Get specific user
POST   /api/users              # Create new user
PUT    /api/users/:id          # Update user (full replacement)
PATCH  /api/users/:id          # Update user (partial)
DELETE /api/users/:id          # Delete user

GET    /api/users/:id/posts    # Get user's posts
POST   /api/users/:id/posts    # Create post for user

❌ Bad: Action-based URLs
POST   /api/createUser
GET    /api/getUserById/:id
POST   /api/deleteUser/:id
```

### HTTP Status Codes
```typescript
// ✅ Good: Proper status code usage
app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        error: 'User not found',
        code: 'USER_NOT_FOUND'
      });
    }

    res.status(200).json({ data: user });
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      code: 'INTERNAL_ERROR'
    });
  }
});

// Status code reference:
// 200 - OK (successful GET, PUT, PATCH)
// 201 - Created (successful POST)
// 204 - No Content (successful DELETE)
// 400 - Bad Request (validation errors)
// 401 - Unauthorized (authentication required)
// 403 - Forbidden (insufficient permissions)
// 404 - Not Found (resource doesn't exist)
// 409 - Conflict (duplicate resource)
// 422 - Unprocessable Entity (validation failed)
// 500 - Internal Server Error (server errors)
```

### Response Format Standardization
```typescript
// ✅ Good: Consistent response format
interface ApiResponse<T> {
  data?: T;
  error?: string;
  code?: string;
  message?: string;
  meta?: {
    pagination?: PaginationMeta;
    timestamps?: {
      requestedAt: string;
      respondedAt: string;
    };
  };
}

interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Success response
app.get('/api/users', async (req, res) => {
  const users = await User.findAll();

  res.json({
    data: users,
    meta: {
      pagination: {
        page: 1,
        limit: 20,
        total: users.length,
        totalPages: Math.ceil(users.length / 20),
        hasNext: false,
        hasPrev: false
      },
      timestamps: {
        requestedAt: req.startTime,
        respondedAt: new Date().toISOString()
      }
    }
  });
});

// Error response
app.post('/api/users', async (req, res) => {
  try {
    const validatedData = userSchema.parse(req.body);
    const user = await User.create(validatedData);

    res.status(201).json({ data: user });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(422).json({
        error: 'Validation failed',
        code: 'VALIDATION_ERROR',
        details: error.errors
      });
    }

    res.status(500).json({
      error: 'Failed to create user',
      code: 'USER_CREATION_FAILED'
    });
  }
});
```

## Security Standards

### Authentication & Authorization
```typescript
// ✅ Good: JWT token validation middleware
import jwt from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  user?: User;
}

const authenticateToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ')
    ? authHeader.substring(7)
    : null;

  if (!token) {
    return res.status(401).json({
      error: 'Access token required',
      code: 'MISSING_TOKEN'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        error: 'Invalid token',
        code: 'INVALID_TOKEN'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      error: 'Invalid token',
      code: 'INVALID_TOKEN'
    });
  }
};

// Role-based authorization
const requireRole = (roles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        error: 'Authentication required',
        code: 'UNAUTHENTICATED'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        error: 'Insufficient permissions',
        code: 'INSUFFICIENT_PERMISSIONS'
      });
    }

    next();
  };
};
```

### Input Validation & Sanitization
```typescript
import { z } from 'zod';

// ✅ Good: Comprehensive validation schemas
const createUserSchema = z.object({
  email: z.string()
    .email('Invalid email format')
    .max(255, 'Email too long')
    .transform(val => val.toLowerCase().trim()),

  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password too long')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
           'Password must contain uppercase, lowercase, and number'),

  name: z.string()
    .min(1, 'Name is required')
    .max(100, 'Name too long')
    .transform(val => val.trim()),

  age: z.number()
    .int('Age must be an integer')
    .min(13, 'Must be at least 13 years old')
    .max(120, 'Invalid age')
    .optional(),

  preferences: z.object({
    newsletter: z.boolean().default(false),
    notifications: z.boolean().default(true)
  }).optional()
});

// Validation middleware
const validateInput = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: 'Validation failed',
          code: 'VALIDATION_ERROR',
          details: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message,
            code: err.code
          }))
        });
      }

      res.status(500).json({
        error: 'Validation error',
        code: 'VALIDATION_FAILED'
      });
    }
  };
};

// Usage
app.post('/api/users',
  validateInput(createUserSchema),
  async (req, res) => {
    // req.body is now validated and sanitized
    const user = await User.create(req.body);
    res.status(201).json({ data: user });
  }
);
```

### Rate Limiting & Security Headers
```typescript
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

// ✅ Good: Rate limiting configuration
const createAccountLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // Limit each IP to 5 requests per hour
  message: {
    error: 'Too many accounts created from this IP',
    code: 'RATE_LIMIT_EXCEEDED'
  },
  standardHeaders: true,
  legacyHeaders: false
});

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per 15 minutes
});

// Security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));

// CORS configuration
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

## Database Integration Standards

### Query Optimization
```typescript
// ✅ Good: Efficient database queries
class UserService {
  // Use select to only fetch needed fields
  static async findById(id: string) {
    return await User.findById(id).select('id name email role createdAt');
  }

  // Use pagination for large datasets
  static async findAll(page: number = 1, limit: number = 20) {
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      User.find()
        .select('id name email role createdAt')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      User.countDocuments()
    ]);

    return {
      users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    };
  }

  // Use aggregation for complex queries
  static async getUserStats() {
    return await User.aggregate([
      {
        $group: {
          _id: '$role',
          count: { $sum: 1 },
          avgAge: { $avg: '$age' }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);
  }
}
```

### Transaction Handling
```typescript
// ✅ Good: Proper transaction management
import { startSession } from 'mongoose';

class OrderService {
  static async createOrder(userId: string, items: OrderItem[]) {
    const session = await startSession();

    try {
      await session.withTransaction(async () => {
        // Create order
        const order = await Order.create([{
          userId,
          items,
          status: 'pending',
          total: items.reduce((sum, item) => sum + item.price * item.quantity, 0)
        }], { session });

        // Update inventory
        for (const item of items) {
          await Product.findByIdAndUpdate(
            item.productId,
            { $inc: { stock: -item.quantity } },
            { session }
          );
        }

        // Create payment record
        await Payment.create([{
          orderId: order[0]._id,
          amount: order[0].total,
          status: 'pending'
        }], { session });

        return order[0];
      });
    } finally {
      await session.endSession();
    }
  }
}
```

## Error Handling & Logging

### Centralized Error Handling
```typescript
// ✅ Good: Custom error classes
class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number,
    public code: string,
    public isOperational: boolean = true
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

class ValidationError extends AppError {
  constructor(message: string, details?: any) {
    super(message, 400, 'VALIDATION_ERROR');
    this.details = details;
  }
}

class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} not found`, 404, 'NOT_FOUND');
  }
}

// Global error handler
const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log error
  logger.error('API Error:', {
    error: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.message,
      code: err.code,
      ...(err.details && { details: err.details })
    });
  }

  // Don't leak error details in production
  const message = process.env.NODE_ENV === 'production'
    ? 'Internal server error'
    : err.message;

  res.status(500).json({
    error: message,
    code: 'INTERNAL_ERROR'
  });
};
```

These standards ensure secure, maintainable, and performant backend API development.