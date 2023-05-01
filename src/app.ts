import 'colors';
import express, { Application, json, urlencoded } from 'express';
import config from 'config';
import { connectToDB } from './db';
import rateLimit from 'express-rate-limit'; // for brute for attack
import mongoSanitize from 'express-mongo-sanitize'; // for no-sql query injection
import cors from 'cors';
import morgan from 'morgan';
import { deserializeUser } from './middlewares';
import routes from './routes';
import { runCronJob } from './utils/cron.utils';

const PORT = config.get('port') as number;
const HOST = config.get('host') as string;

const MINUTES = 60;
const SECONDS = 60;
const MILLISECONDS = 1000;

const limiter = rateLimit({
  windowMs: MINUTES * SECONDS * MILLISECONDS, // 1h
  max: 1000, // limit each IP to 1000 requests per windowMs
  message: `Too many requests sent by this IP, please try again in an hour!, you've exceed the number of requests!`,
});

const app: Application = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(deserializeUser);

app.use(cors({ origin: true, credentials: true }));
app.use(limiter);
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(mongoSanitize());

app.listen(PORT, HOST, () => {
  console.log(`Server listing at http://${HOST}:${PORT}!`.yellow);
  connectToDB(); // connect to database
  routes(app); // here is all app routes goes
  runCronJob(5); // run cron job after every 5 minutes
});
