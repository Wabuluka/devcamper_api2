const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const logger = require('./middleware/logger');
const colors = require('colors');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error')

// load env vars
dotenv.config({ path: './config/config.env' });
// connect to DB
connectDB();

// Route Files
const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');
const auth = require('./routes/auth');


const app = express();

// Body Parser
app.use(express.json());

// cookie parser
app.use(cookieParser());

// dev logging middleware
if(process.env.NODE_ENV==='development'){
    app.use(logger);
}

app.use(fileupload());

// set static folder
app.use(express.static(path.join(__dirname, 'public')))

// Mount routes
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);
app.use('/api/v1/auth', auth);

// errors handling
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, ()=>{
    console.log(`Server running in ${process.env.NODE_ENV} mode and port: ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    server.close(()=>{
        process.exit(1);
    })
})