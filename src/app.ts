import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import { port } from './config';

import { internalError, pageNotFound } from './middlewares/error.middleware';
import { routes } from './routes';
import { initializeSetup } from './utils/initializeSetup';

const app = express();

// config
app.set('port', port);

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/api', routes);

// initialize Setup
initializeSetup();

app.use(pageNotFound);
app.use(internalError);

export default app;
