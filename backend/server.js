const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const reportRoutes=require('./routes/reportRoutes')
const teamRoutes=require('./routes/teamRoutes')
const recycleRoutes = require('./routes/recycleRoutes');
const { chatBotController } = require('./controllers/chatbotController');

dotenv.config();
connectDB();

const app = express();

app.use('/uploads', express.static('uploads'));

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use("/api/report", reportRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/recycle', recycleRoutes);
app.post('/api/chat', chatBotController);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
