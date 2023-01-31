// import required modules
require('express-async-errors');
require('dotenv').config();
// const cors = require('cors');
const cookieParser = require('cookie-parser');

// Importing the express module
const express = require('express');
const app = express();

// const corsOptions = {
//     origin: 'http://localhost:5173',
//     credentials: true, //access-control-allow-credentials:true
// };
// middleware
app.use(express.json());
// app.use(cors());
app.use(cookieParser(process.env.COOKIE_SECRET));

// Importing the routes
const authRouter = require('./routers/authRouter');
const userRouter = require('./routers/userRouter');
const ProjectsRouter = require('./routers/projectsRouter');
const scanRouter = require('./routers/scanRouter');

// Routes
app.get('/', (req, res) => {
    res.json({ msg: req.signedCookies });
});
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/projects', ProjectsRouter);
app.use('/api/scan', scanRouter);

// Not found route
app.use((req, res) => {
    res.json({ msg: 'Route not Found' });
});
// Error Handler
const errHandler = require('./middleware/errHandler');
app.use(errHandler);

// Create Server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
