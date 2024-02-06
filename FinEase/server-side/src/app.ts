import createError, { HttpError } from 'http-errors';
import express, { Request, Response } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';

import usersRouter from './routes/users';
import authRouter from './routes/auth';
import transactionRouter from './routes/transaction';
import indexRouter from './routes/index';

import connectDB from './config/database';

dotenv.config();
connectDB();

const app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

const corsOptions = {
  origin: true,
  credentials: true,
};
app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', indexRouter);
app.use('/account', usersRouter);
app.use('/auth', authRouter);
app.use('/transaction', transactionRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err: HttpError, req: Request, res: Response) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;

console.log(`App is running on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`);