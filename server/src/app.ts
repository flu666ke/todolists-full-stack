import express from 'express';
import { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

dotenv.config();

const app: Application = express();

import router from './core/route/main-route';

mongoose
  .connect(process.env.DATABASE!, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('DB connected'))
  .catch((err: any) => console.log('DB connection ERROR: ', err));

app.use(morgan('dev'));
app.use(bodyParser.json());
// app.use(cors()); // allow all origins
if (process.env.NODE_ENV === 'development') {
  app.use(cors({ origin: `http://localhost:3000` }));
}

router(app);

app.listen(process.env.PORT, () => console.log('Server running'));
