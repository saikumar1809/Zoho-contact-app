const express = require('express');
const path = require('path');
const app = express();
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const cors=require('cors');
//const xss = require('xss-clean');
//const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/userRoutes');
const contactRouter = require('./routes/contactRoutes');
const viewRouter=require('./routes/viewRoutes');
app.set('view engine','ejs');
// 1) MIDDLEWARES

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(cookieParser());
//limit requests from same api
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'To many requests from this ip please try again in an hour',
  });
  app.use('/api', limiter);
  app.use(express.json({ limit: '10kb' }));
  app.use(express.urlencoded({ extended: true, limit: '10kb' }));
 
 
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(express.static(path.join(__dirname, 'public')));
const corsOptions = {
    origin: true, //included origin as true
    credentials: true, //included credentials as true
};
app.use(cors(corsOptions));
app.use((req, res, next) => {
    console.log('Hello from the middleware 👋');
    next();
});

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});
//Routes
app.use('/',viewRouter);
app.use('/api/users', userRouter);
app.use('/api/contacts', contactRouter);
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });
module.exports = app;