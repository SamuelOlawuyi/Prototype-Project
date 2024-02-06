import { config } from 'dotenv';
import createError, { HttpError } from 'http-errors';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import session from 'express-session';

import indexRouter from './routes/index';
import usersRouter from './routes/users';
import authRouter from './routes/auth';
import dev from './utils/logs';
import passportSetup from './config/passport';
import cors from "cors";

config();
passportSetup()
const app = express();
const nodeEnv = process.env.NODE_ENV || 'development';
dev.log(nodeEnv);

const clientUrl = process.env.NODE_ENV === "development"? process.env.CLIENT_URL_DEV : process.env.CLIENT_URL;

app.use(
  cors({
    origin: clientUrl,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.COOKIE_KEY as string,
    resave: false,
    saveUninitialized: false,
  })
);

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

if (nodeEnv === 'development') {
  app.use(logger('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter)

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: 'An error occurred',
    error: err.message,
  });
});

export default app;
