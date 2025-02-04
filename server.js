const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();

const aiRoutes = require('./routes/aiRoutes');
const userRoutes = require('./routes/userRoutes');
const challengeRoutes = require('./routes/challengeRoutes');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"]
  }
});

const port = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('joinRoom', (userId) => {
    socket.join(`user-${userId}`);
  });

  socket.on('challengeProgress', (data) => {
    io.to(`user-${data.userId}`).emit('progressUpdate', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected successfully');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Routes
app.use('/api/ai', aiRoutes);
app.use('/api/users', userRoutes);
app.use('/api/challenges', challengeRoutes);

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
