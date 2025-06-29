import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Import routes
import authRoutes from './routes/auth.js';
import aiRoutes from './routes/ai.js';
import chatRoutes from './routes/chat.js';
import userRoutes from './routes/user.js';
import fileRoutes from './routes/files.js';
import analyticsRoutes from './routes/analytics.js';
import integrationRoutes from './routes/integrations.js';
import workflowRoutes from './routes/workflows.js';
import collaborationRoutes from './routes/collaboration.js';
import creativityRoutes from './routes/creativity.js';

// Import middleware
import { authenticateToken } from './middleware/auth.js';
import { errorHandler } from './middleware/errorHandler.js';
import { requestLogger } from './middleware/logger.js';

// Import services
import { DatabaseService } from './services/database.js';
import { AIService } from './services/ai.js';
import { RealtimeService } from './services/realtime.js';
import { CacheService } from './services/cache.js';
import { QueueService } from './services/queue.js';
import { NotificationService } from './services/notification.js';
import { AnalyticsService } from './services/analytics.js';
import { SecurityService } from './services/security.js';
import { BackupService } from './services/backup.js';
import { MonitoringService } from './services/monitoring.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true
  }
});

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:", "blob:"],
      scriptSrc: ["'self'", "'unsafe-eval'"],
      connectSrc: ["'self'", "wss:", "https:"],
      mediaSrc: ["'self'", "blob:"],
      objectSrc: ["'none'"],
      frameSrc: ["'none'"]
    }
  }
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 1000 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.',
    retryAfter: 900
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

// Basic middleware
app.use(compression());
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(morgan('combined'));
app.use(requestLogger);

// Serve static files
app.use('/uploads', express.static(join(__dirname, 'uploads')));
app.use('/public', express.static(join(__dirname, 'public')));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    version: process.env.npm_package_version || '1.0.0'
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/chat', authenticateToken, chatRoutes);
app.use('/api/user', authenticateToken, userRoutes);
app.use('/api/files', authenticateToken, fileRoutes);
app.use('/api/analytics', authenticateToken, analyticsRoutes);
app.use('/api/integrations', authenticateToken, integrationRoutes);
app.use('/api/workflows', authenticateToken, workflowRoutes);
app.use('/api/collaboration', authenticateToken, collaborationRoutes);
app.use('/api/creativity', authenticateToken, creativityRoutes);

// WebSocket handling
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (token) {
    // Verify JWT token here
    next();
  } else {
    next(new Error('Authentication error'));
  }
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    socket.to(roomId).emit('user-joined', socket.id);
  });
  
  socket.on('leave-room', (roomId) => {
    socket.leave(roomId);
    socket.to(roomId).emit('user-left', socket.id);
  });
  
  socket.on('chat-message', (data) => {
    socket.to(data.roomId).emit('chat-message', {
      ...data,
      timestamp: new Date().toISOString(),
      socketId: socket.id
    });
  });
  
  socket.on('typing-start', (data) => {
    socket.to(data.roomId).emit('typing-start', {
      userId: data.userId,
      socketId: socket.id
    });
  });
  
  socket.on('typing-stop', (data) => {
    socket.to(data.roomId).emit('typing-stop', {
      userId: data.userId,
      socketId: socket.id
    });
  });
  
  socket.on('cursor-move', (data) => {
    socket.to(data.roomId).emit('cursor-move', {
      ...data,
      socketId: socket.id
    });
  });
  
  socket.on('document-edit', (data) => {
    socket.to(data.roomId).emit('document-edit', {
      ...data,
      timestamp: new Date().toISOString(),
      socketId: socket.id
    });
  });
  
  socket.on('ai-request', async (data) => {
    try {
      const aiService = new AIService();
      const response = await aiService.processRequest(data);
      socket.emit('ai-response', response);
    } catch (error) {
      socket.emit('ai-error', { error: error.message });
    }
  });
  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Initialize services
const initializeServices = async () => {
  try {
    // Initialize database
    await DatabaseService.initialize();
    console.log('✅ Database service initialized');
    
    // Initialize cache
    await CacheService.initialize();
    console.log('✅ Cache service initialized');
    
    // Initialize queue
    await QueueService.initialize();
    console.log('✅ Queue service initialized');
    
    // Initialize AI service
    await AIService.initialize();
    console.log('✅ AI service initialized');
    
    // Initialize realtime service
    RealtimeService.initialize(io);
    console.log('✅ Realtime service initialized');
    
    // Initialize notification service
    await NotificationService.initialize();
    console.log('✅ Notification service initialized');
    
    // Initialize analytics service
    await AnalyticsService.initialize();
    console.log('✅ Analytics service initialized');
    
    // Initialize security service
    await SecurityService.initialize();
    console.log('✅ Security service initialized');
    
    // Initialize backup service
    await BackupService.initialize();
    console.log('✅ Backup service initialized');
    
    // Initialize monitoring service
    await MonitoringService.initialize();
    console.log('✅ Monitoring service initialized');
    
  } catch (error) {
    console.error('❌ Failed to initialize services:', error);
    process.exit(1);
  }
};

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl,
    method: req.method,
    timestamp: new Date().toISOString()
  });
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

process.on('SIGINT', async () => {
  console.log('SIGINT received, shutting down gracefully');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

// Start server
const PORT = process.env.PORT || 3001;

const startServer = async () => {
  await initializeServices();
  
  server.listen(PORT, () => {
    console.log(`
🚀 Athena AI Server is running!
📡 Port: ${PORT}
🌍 Environment: ${process.env.NODE_ENV || 'development'}
🔗 URL: http://localhost:${PORT}
📊 Health: http://localhost:${PORT}/health
🎯 API: http://localhost:${PORT}/api
⚡ WebSocket: ws://localhost:${PORT}
    `);
  });
};

startServer().catch(console.error);

export default app;